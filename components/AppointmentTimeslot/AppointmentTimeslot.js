import { compareDates, formatTime } from "../../base/datetime";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AppointmentTimeslot({
    time,
    selectedDate,
    appointments,
    onSelectTimeSlot,
    isSelected
}) {
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