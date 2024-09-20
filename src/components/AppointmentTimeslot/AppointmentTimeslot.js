import { addTime, compareDates } from "../../base/datetime";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Renders an appointment timeslot button component
 * @param {Object} time - The current time object with hour, minute, and time properties
 * @param {Date} selectedDate - The currently selected date
 * @param {Function} onSelectDate - Callback function to handle date selection
 * @param {Array} appointments - Array of existing appointments
 * @param {Object} selectedTime - The currently selected time object
 * @param {Function} onSelectedTime - Callback function to handle time selection
 * @returns {React.Component} A Button component representing the appointment timeslot
 */
export default function AppointmentTimeslot({
    time: currentTime,
    selectedDate,
    onSelectDate,
    appointments,
    selectedTime,
    onSelectedTime
}) {
    const currentDate = addTime(selectedDate, currentTime.hour, currentTime.minute);

    /**
     * Checks if a given date is already booked or in the past
     * @param {Date} currentDate - The date to check for booking
     * @param {Array} appointments - An array of appointment objects
     * @returns {boolean} True if the date is booked or in the past, false otherwise
     */
    const isBooked = appointments.some(app =>
        compareDates(app.date, currentDate) ||
        new Date(currentDate).getTime() < Date.now());

    /**
     * Handles the selection of a timeslot by updating the selected time and date.
     * @param {void} - This function doesn't take any parameters.
     * @returns {void} This function doesn't return a value.
     */
    const handleSelectTimeslot = () => {
        onSelectedTime(currentTime);
        onSelectDate(currentDate);
    };

    return (
        <Button
            variant={selectedTime && 
                selectedTime.hour === currentTime.hour && 
                selectedTime.minute === currentTime.minute ? 
                "default" : "outline"}
            className={cn(
                "w-full",
                isBooked && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !isBooked && handleSelectTimeslot()}
            disabled={isBooked}
        >
            {currentTime.time}
        </Button>
    );
}