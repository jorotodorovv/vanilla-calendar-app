import prisma from "../../../lib/prisma";
import { LOCALE, TIME_ZONE } from '../../../base/datetime';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id, date } = req.body;

    try {
        
        if (new Date(date).getTime() < Date.now()) {
            return res.status(400).json({ error: 'Cannot schedule appointments in the past' });
        }
        
        if (!date) {
            return res.status(400).json({ error: 'Missing date fields' });
        }

        await prisma.appointment.delete({
            where: { id }
        });

        const appointment = await prisma.appointment.create({
            data: { date: new Date(date) }
        });

        return res.status(200).json({
            id: appointment.id, 
            date: appointment.date.toLocaleString(LOCALE, { timeZone: TIME_ZONE }),
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
