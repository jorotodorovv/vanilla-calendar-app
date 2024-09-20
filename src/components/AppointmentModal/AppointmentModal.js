import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { formatTime, getHours } from "../../base/datetime";

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
  /**
   * Selects the existing appointment from the Redux store
   /**
    * Calculates and formats available hours for scheduling
    * @returns {Array<Object>} An array of objects containing formatted time, hour, and minute
    */
   * @param {Function} state - The current Redux state
   * @returns {Object|null} The existing appointment object if present, otherwise null
   */
  const existingAppointment = useSelector((state) => state.appointment.existingAppointment);

  /**
   * A React effect hook that manages notification visibility and cleans up appointment data
   * @param {function} onShowNotification - Function to control the visibility of notifications
   * @returns {function} Cleanup function that resets selected time and clears appointment data
   */
  /**
   * Generates an array of available time slots between 9 AM and 6 PM with 30-minute intervals
   * @returns {Array<Object>} An array of objects containing formatted time, hour, and minute
   */
  const availableHours = useMemo(() => getHours(9, 0.5, 9).map(time => {
    const hour = Math.floor(time);
    const minute = (time - hour) * 60;

    const date = new Date(0, 0, 0, hour, minute);

    return { time: formatTime(date), hour, minute };
  }), []);

  useEffect(() => {
    onShowNotification(false);
    ```
    /**
     * Creates and returns a function that resets the selected time and clears the appointment.
     * @returns {Function} A function that when called, sets the selected time to null and clears the appointment.
     */
    ```
    return () => {
      setSelectedTime(null);

      clearAppointment();
    }
  }, [onShowNotification]);

  /**
   * Clears the existing appointment by dispatching an action.
   * @returns {void} This function doesn't return a value.
   */
  const clearAppointment = () => dispatch(clearExistingAppointment());

  /**
   * Confirms or updates an appointment by making an API request.
   * @param {void} - This function doesn't take any parameters directly.
   * @returns {Promise<void>} A promise that resolves when the appointment is confirmed or updated.
   */
  const confirmAppointment = async () => {
    setIsLoading(true);

    try {
      const endpoint = existingAppointment ? '/api/appointments/update' : '/api/appointments';
      const method = existingAppointment ? 'PUT' : 'POST';

      const data = existingAppointment
        ? { id: existingAppointment.id, date: selectedDate }
        : { date: selectedDate };
/**
 * Maps through appointments and updates the appointment matching the existing appointment's date
 * @param {Array} appointments - An array of appointment objects
 * @param {Object} existingAppointment - The appointment to be updated
 * @param {Object} mappedAppointment - The new appointment data to replace the existing one
 * @returns {Array} A new array of appointments with the updated appointment
 */

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const appointment = await res.json();

        const mappedAppointment = {
          ...appointment, ...selectedTime
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
                key={`${time.time}`}
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
            <p className="mb-2">You selected <span className="font-bold">{selectedTime.time}</span></p>
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