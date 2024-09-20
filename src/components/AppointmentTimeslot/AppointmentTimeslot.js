import { addTime, compareDates } from "../../base/datetime";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AppointmentTimeslot({
    time: currentTime,
    selectedDate,
    onSelectDate,
    appointments,
    selectedTime,
    onSelectedTime
}) {
    const currentDate = addTime(selectedDate, currentTime.hour, currentTime.minute);

    const isBooked = appointments.some(app =>
        compareDates(app.date, currentDate) ||
        new Date(currentDate).getTime() < Date.now());

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