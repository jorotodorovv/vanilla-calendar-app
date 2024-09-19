import { compareDates, formatTime } from "../../base/datetime";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

```
/**
 * Renders an appointment timeslot button component.
 * @param {string} time - The time of the appointment slot.
 * @param {Date} selectedDate - The currently selected date.
 * @param {Array} appointments - An array of existing appointments.
 * @param {Function} onSelectTimeSlot - Callback function to handle timeslot selection.
 * @param {boolean} isSelected - Indicates whether this timeslot is currently selected.
 * @returns {React.Component} A Button component representing the appointment timeslot.
 */
```
export default function AppointmentTimeslot({
    time,
    selectedDate,
    appointments,
    onSelectTimeSlot,
    isSelected
}) {
    /**
     * Checks if a specific time slot is already booked on a selected date
     * @param {Date} selectedDate - The date to check for appointments
     * @param {string} time - The time slot to check for availability
     * @returns {boolean} True if the time slot is booked, false otherwise
     */
    const isBooked = appointments.some(app => compareDates(app.date, selectedDate) && app.time === time);

    return (
        <Button
            variant={isSelected ? "default" : "outline"}
            className={cn(
                "w-full",
                isBooked && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !isBooked && onSelectTimeSlot(time)}
            disabled={isBooked}
        >
            {formatTime(time)}
        </Button>
    );
}