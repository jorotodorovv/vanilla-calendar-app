import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { addHours, formatTime, getHours } from "../../base/datetime";

import AppointmentTimeslot from "../AppointmentTimeslot/AppointmentTimeslot";
import { clearExistingAppointment } from "../../store/appointmentSlice";

/**
 * AppointmentModal component for managing appointment scheduling and updates
 * @param {Date} selectedDate - The date selected for the appointment
 * @param {Array} appointments - List of existing appointments
 * @param {Function} onSetAppointments - Callback to update the appointments list
 * @param {Function} onSetShowModal - Callback to control the visibility of the modal
 * @param {Function} onShowNotification - Callback to show notifications
 * @param {Function} onSetError - Callback to set error messages
 * @returns {JSX.Element} A dialog component for appointment scheduling and management
 */
export default function AppointmentModal({
  selectedDate,
  appointments,
  onSetAppointments,
  onSetShowModal,
  onShowNotification,
  onSetError
}) {
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  /**
   * Selects the existing appointment from the Redux store
   /**
    * Calculates and memoizes an array of available hours
    * @param {void} - No parameters
    * @returns {Array<string>} An array of formatted time strings representing available hours
    */
   * @param {Function} state - The current Redux state
   * @returns {Object} The existing appointment object from the state
   /**
    * A React useEffect hook that manages notification visibility and cleans up appointment data.
    * @param {function} onShowNotification - Function to control the visibility of notifications.
    * @returns {function} Cleanup function that resets selected time and clears appointment data.
    */
   */
  const existingAppointment = useSelector((state) => state.appointment.existingAppointment);

  const availableHours = useMemo(() => getHours(9, 0.5, 9), []);

  useEffect(() => {
    onShowNotification(false);
    /**
     * Returns a function that resets the selected time and clears the appointment.
     * @returns {Function} A function that when called, sets the selected time to null and clears the appointment.
     */
    return () => {
      setSelectedTime(null);
      clearAppointment();
    }
  }, [onShowNotification]);

  /**
   * Clears the existing appointment from the application state
   * @returns {void} Dispatches an action to clear the appointment, no return value
   */
  const clearAppointment = () => dispatch(clearExistingAppointment());

  /**
   * Confirms or updates an appointment asynchronously
   * @param {void} - This function doesn't take any parameters directly
   * @returns {Promise<void>} A promise that resolves when the appointment is confirmed or updated
   */
  const confirmAppointment = async () => {
    setIsLoading(true);

    try {
      const date = addHours(selectedDate, selectedTime);
      
      const endpoint = existingAppointment ? '/api/appointments/update' : '/api/appointments';
      const method = existingAppointment ? 'PUT' : 'POST';

      const data = existingAppointment
        ? { id: existingAppointment.id, date }
        : { date };

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      /**
       * Maps through an array of appointments and updates a specific appointment if its date matches the existingAppointment's date
       * @param {Array} appointments - The array of appointment objects to be mapped
       * @param {Object} existingAppointment - The appointment object to be checked against
       * @param {Object} mappedAppointment - The new appointment object to replace the existing one if dates match
       * @returns {Array} A new array of appointments with the specified appointment updated if a match is found
       */
      if (res.ok) {
        const appointment = await res.json();

        console.log(appointment);
        const mappedAppointment = {
          ...appointment, time: selectedTime
        };

        const updatedAppointments = existingAppointment
          ? appointments.map(app => app.date === existingAppointment.date ? mappedAppointment : app)
          : [...appointments, mappedAppointment];

        onSetAppointments(updatedAppointments);
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
              ? `Update Appointment for ${selectedDate.toLocaleDateString()}`
              : `Select a time for ${selectedDate.toLocaleDateString()}`}
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
                appointments={appointments}
                onSelectTimeSlot={setSelectedTime}
                isSelected={selectedTime === time}
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