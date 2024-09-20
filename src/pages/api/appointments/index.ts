import prisma from "../../../lib/prisma";

/**
 * Handles GET and POST requests for appointment management.
 * @param {Object} req - The request object containing method and query/body parameters.
 * @param {Object} res - The response object used to send back the API response.
 * @returns {Promise<void>} Doesn't return a value, but sends a JSON response with appropriate status code.
 */
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { date } = req.query;

        const appointment = await prisma.appointment.findFirst({
            where: {
                date: new Date(date),
            },
        });

        if (appointment) {
            res.status(200).json({ appointment });
        }
        else {
            res.status(400);
        }
    }
    else if (req.method === 'POST') {
        try {
            const { date } = req.body;
            
            if (!date) {
                return res.status(400).json({ error: 'Missing date fields' });
            }

            if (new Date(date).getTime() < Date.now()) {
                return res.status(400).json({ error: 'Cannot schedule appointments in the past' });
            }

            const existingAppointment = await prisma.appointment.findFirst({
                where: {
                    date: new Date(date),
                },
            });

            if (existingAppointment) {
                return res.status(409).json({ error: 'Appointment has been already taken.' });
            }

            const appointment = await prisma.appointment.create({
                data: { date: new Date(date) },
            });

            res.status(201).json({
                id: appointment.id, 
                date: appointment.date,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error creating appointment' });
        }
    }
    else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
