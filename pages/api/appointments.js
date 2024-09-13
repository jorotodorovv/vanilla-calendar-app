import prisma from "../../lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { date } = req.body;
        try {
            const newAppointment = await prisma.appointment.create({
                data: { date: new Date(date) },
            });
            res.status(201).json(newAppointment);
        } catch (error) {
            res.status(500).json({ error: 'Error creating appointment' });
        }
    }
    else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
