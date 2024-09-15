import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id, date } = req.body;

    try {
        await prisma.appointment.delete({
            where: { id }
        });

        const appointment = await prisma.appointment.create({
            data: { date: new Date(date) }
        });

        return res.status(200).json({
            id: appointment.id, 
            date: appointment.date,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
