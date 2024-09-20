import { addTime, compareDates, formatTime } from "../../base/datetime";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AppointmentTimeslot({
    time,
    selectedDate,
    onSelectDate,
    appointments,
    selectedTime,
    onSelectedTime
}) {
    const hours = Math.floor(time);
    const minutes = (time - hours) * 60;

    const currentDate = addTime(selectedDate, hours, minutes);
    
    const isBooked = appointments.some(app =>
        compareDates(app.date, currentDate) ||
        new Date(currentDate).getTime() < Date.now());

    const handleSelectTimeslot = () => {
        onSelectedTime(time);
        onSelectDate(currentDate);
    };

    return (
        <Button
            variant={selectedTime === time ? "default" : "outline"}
            className={cn(
                "w-full",
                isBooked && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !isBooked && handleSelectTimeslot()}
            disabled={isBooked}
        >
            {formatTime(time)}
        </Button>
    );
}