import { useEffect, useState } from "react";
import { compareDates } from "../../base/datetime";
import AppointmentPopup from "../AppointmentPopup/AppointmentPopup";
import { cn } from "@/lib/utils"

/**
 * Renders an appointment date component with interactive functionality
 * @param {number} day - The day of the month (0-indexed)
 * @param {number} month - The month (0-indexed)
 * @param {number} year - The year
 * @param {Array} appointments - List of appointments
 /**
  * Effect hook to reset the expanded date state when month or modal visibility changes
  * @param {function} setExpandedDate - Function to update the expanded date state
  * @param {number|string} month - The current month value
  * @param {boolean} showModal - Flag indicating whether the modal is visible
  * @returns {void} This effect does not return anything
  */
 * @param {boolean} showModal - Flag to control modal visibility
 * @param {function} onShowModal - Callback function to show/hide modal
 * @param {function} onSelectDate - Callback function when a date is selected
 * @param {Date} selectedDate - Currently selected date
 * @returns {JSX.Element} A div element representing the appointment date
 */
export default function AppointmentDate({ day, month, year, appointments, showModal, onShowModal, onSelectDate, selectedDate }) {
  const date = day + 1;
  const currentDate = new Date(year, month, date);

  const [expandedDate, setExpandedDate] = useState(false);

  useEffect(() => {
    setExpandedDate(false);
  }, [month, showModal]);

  ```
  /**
   * Handles the click event on a date element.
   * @param {void} - This function doesn't take any parameters.
   * @returns {void} This function doesn't return a value.
   */
  ```
  const handleDateClick = () => {
    /**
     /**
      * Sorts an array of appointment objects based on their time (hour and minute).
      * @param {Object} app1 - The first appointment object to compare.
      * @param {number} app1.hour - The hour of the first appointment.
      * @param {number} app1.minute - The minute of the first appointment.
      * @param {Object} app2 - The second appointment object to compare.
      * @param {number} app2.hour - The hour of the second appointment.
      * @param {number} app2.minute - The minute of the second appointment.
      * @returns {number} A negative number if app1 is earlier, positive if app2 is earlier, or zero if they are at the same time.
      */
     * Filters applications based on a date comparison with the current date
     * @param {function} compareDates - Function to compare two dates
     * @param {object} app - The application object containing a date property
     * @param {Date} currentDate - The current date to compare against
     * @param {boolean} true - Indicates the comparison method (likely to include the current date)
     * @returns {Array} An array of applications that meet the date criteria
     */
    onSelectDate(currentDate);
    onShowModal(true);
    setExpandedDate(false);
  };

  
  const dayAppointments = appointments
    .filter(app => compareDates(app.date, currentDate, true))
    .sort((app1, app2) => {
      return app1.hour !== app2.hour ? 
      app1.hour - app2.hour : 
      app1.minute - app2.minute
    });

  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);

  const isSelectable = dateNow.getTime() <= currentDate.getTime();
  const isSelected = selectedDate && compareDates(selectedDate, currentDate);

  return (
    <div
      onClick={isSelectable ? handleDateClick : undefined}
      className={cn(
        "p-2 rounded-lg relative flex flex-col h-14 border",
        isSelectable ? "cursor-pointer hover:bg-green-600 hover:text-primary-foreground" : "bg-muted text-muted-foreground",
        isSelected && "bg-green-600 text-primary-foreground",
      )}
    >
      <span className={cn("text-sm", isSelected && "text-primary-foreground")}>{date}</span>
      <AppointmentPopup
        dayAppointments={dayAppointments}
        isSelectable={isSelectable}
        expandedDate={expandedDate}
        onDateClick={handleDateClick}
        onSetExpandedDate={setExpandedDate}
      />
    </div>
  );
}