import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { addHours, formatTime, getHours } from "../../base/datetime";

import AppointmentTimeslot from "../AppointmentTimeslot/AppointmentTimeslot";
import { clearExistingAppointment } from "../../store/appointmentSlice";

export default function AppointmentModal({
  selectedDate,
  appointments,
  onSelectDate,
  onSetAppointments,
  onSetShowModal,
  onShowNotification,
  onSetError
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const dispatch = useDispatch();
  const existingAppointment = useSelector((state) => state.appointment.existingAppointment);

  const availableHours = useMemo(() => getHours(9, 0.5, 9), []);

  useEffect(() => {
    onShowNotification(false);
    return () => {
      setSelectedTime(null);
      //onSelectDate(null);

      clearAppointment();
    }
  }, [onShowNotification]);

  const clearAppointment = () => dispatch(clearExistingAppointment());

  const confirmAppointment = async () => {
    setIsLoading(true);

    try {
      const endpoint = existingAppointment ? '/api/appointments/update' : '/api/appointments';
      const method = existingAppointment ? 'PUT' : 'POST';

      const data = existingAppointment
        ? { id: existingAppointment.id, date: selectedDate }
        : { date: selectedDate };

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const appointment = await res.json();

        const mappedAppointment = {
          ...appointment, time: selectedTime
        };

        const updatedAppointments = existingAppointment
          ? appointments.map(app => app.date === existingAppointment.date ? mappedAppointment : app)
          : [...appointments, mappedAppointment];

        onSetAppointments(updatedAppointments);
        onSetError(null);
        onShowNotification(true);
      }
      else {
        const result = await res.json();
        throw new Error(result.error);
      }
    } catch (ex) {
      onSetError(ex.message);
      onShowNotification(true);
    } finally {
      setIsLoading(false);
      onSetShowModal(false);
      clearAppointment();
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onSetShowModal(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {existingAppointment
              ? `Update Appointment for ${selectedDate}`
              : `Select a time for ${selectedDate}`}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="grid grid-cols-2 gap-4">
            {availableHours.map((time, index) => (
              <AppointmentTimeslot
                key={`${selectedDate}-${time}`}
                time={time}
                index={index}
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
                appointments={appointments}
                selectedTime={selectedTime}
                onSelectedTime={setSelectedTime}
              />
            ))}
          </div>
        </ScrollArea>
        {selectedTime && (
          <div className="mt-4 text-center">
            <p className="mb-2">You selected <span className="font-bold">{formatTime(selectedTime)}</span></p>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onSetShowModal(false)}>
            Cancel
          </Button>
          <Button
            onClick={confirmAppointment}
            disabled={!selectedTime || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              existingAppointment ? 'Update Appointment' : 'Confirm Appointment'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}