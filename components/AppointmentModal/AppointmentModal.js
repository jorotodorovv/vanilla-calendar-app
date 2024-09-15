import { useEffect, useMemo, useState } from "react";
import { addHours, formatTime } from "../../base/datetime";
import AppointmentTimeslot from "../AppointmentTimeslot/AppointmentTimeslot";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

export default function AppointmentModal({
  selectedDate,
  appointments,
  onSetAppointments,
  onSetShowModal,
  onShowNotification,
  onSetError
}) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const availableHours = useMemo(() => Array.from({ length: 10 }, (_, i) => i + 9), []);

  useEffect(() => {
    onShowNotification(false);
    return () => setSelectedTimeSlot(null);
  }, [onShowNotification]);

  const confirmAppointment = async () => {
    setIsLoading(true);
    try {
      let date = addHours(selectedDate, selectedTimeSlot);

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date }),
      });

      if (res.ok) {
        onSetAppointments([...appointments, { date, time: selectedTimeSlot }]);
        onSetShowModal(false);
        onShowNotification(true);
      } else {
        const result = await res.json();
        throw new Error(result.error);
      }
    } catch (ex) {
      onSetError(ex.message);
      onShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onSetShowModal(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a time for {selectedDate.toLocaleDateString()}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="grid grid-cols-2 gap-4">
            {availableHours.map((time, index) => (
              <AppointmentTimeslot
                key={`${selectedDate}-${time}`}
                time={time}
                index={index}
                selectedDate={selectedDate}
                appointments={appointments}
                onSelectTimeSlot={setSelectedTimeSlot}
                isSelected={selectedTimeSlot === time}
              />
            ))}
          </div>
        </ScrollArea>
        {selectedTimeSlot && (
          <div className="mt-4 text-center">
            <p className="mb-2">You selected <span className="font-bold">{formatTime(selectedTimeSlot)}</span></p>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onSetShowModal(false)}>
            Cancel
          </Button>
          <Button 
            onClick={confirmAppointment} 
            disabled={!selectedTimeSlot || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Confirm Appointment'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}