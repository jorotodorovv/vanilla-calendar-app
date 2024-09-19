import prisma from "../../../lib/prisma";

/**
 * Handles PUT requests to update or reschedule an appointment.
 * @param {Object} req - The request object containing the appointment details.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.id - The ID of the appointment to be updated.
 * @param {string} req.body.date - The new date for the appointment.
 * @param {Object} res - The response object used to send the result back to the client.
 * @returns {Object} The updated appointment details or an error message.
 */
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
            date: appointment.date,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
