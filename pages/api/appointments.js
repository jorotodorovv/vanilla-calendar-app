import prisma from "../../lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { date } = req.query;

        const appointment = await prisma.appointment.findFirst({
            where: {
                date: new Date(date),
            },
        });

        if (appointment) {
            res.status(200).json(appointment);
        }
        else {
            res.status(400);
        }
    }
    else if (req.method === 'POST') {
        try {
            if (!date) {
                return res.status(400).json({ error: 'Missing date fields' });
            }
            // if (!availableHours.some(a => a === props.selectedTimeSlot)) {
            //     throw new Error('Current time slot is not available for appointment.');
            //   }
            const { date } = req.body;

            const existingAppointment = await prisma.appointment.findFirst({
                where: {
                    date: new Date(date),
                },
            });

            if (existingAppointment) {
                return res.status(409).json({ error: 'Appointment has been already taken.' });
            }

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
