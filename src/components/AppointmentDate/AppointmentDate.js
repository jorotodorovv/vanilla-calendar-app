import { useEffect, useState } from "react";
import { compareDates } from "../../base/datetime";
import AppointmentPopup from "../AppointmentPopup/AppointmentPopup";
import { cn } from "@/lib/utils"

/**
 * Renders an appointment date component with interactive functionality
 * @param {number} day - The day of the month (0-based index)
 * @param {number} month - The month (0-based index)
 * @param {number} year - The year
 * @param {Array} appointments - List of appointments
 * @param {boolean} showModal - Flag to control modal visibility
 * @param {function} onShowModal - Callback function to show/hide modal
 * @param {function} onSelectDate - Callback function when a date is selected
 * @param {Date} selectedDate - Currently selected date
 * @returns {JSX.Element} A div element representing the appointment date
 */
export default function AppointmentDate({ day, month, year, appointments, showModal, onShowModal, onSelectDate, selectedDate }) {
  const date = day + 1;
  const fullDate = new Date(year, month, date);
  const [expandedDate, setExpandedDate] = useState(false);

  /**
   * Effect hook to reset the expanded date state when month or modal visibility changes
   * @param {function} setExpandedDate - Function to update the expanded date state
   * @param {number|string} month - The current month value
   * @param {boolean} showModal - Flag indicating whether the modal is visible
   * @returns {void} This effect does not return anything
   */
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
    onSelectDate(fullDate);
    /**
     * Filters applications based on a date comparison
     * @param {Function} compareDates - Function to compare dates
     * @param {Object} app - The application object containing a date property
     * @param {Date|string} fullDate - The date to compare against
     * @returns {boolean} True if the application date matches the comparison criteria, false otherwise
     */
    onShowModal(true);
    setExpandedDate(false);
  };

  /**
   * Checks if there is an appointment on a specific date
   * @param {Array} appointments - An array of appointment objects
   * @param {Date|string} fullDate - The date to check for appointments
   * @returns {boolean} True if an appointment exists on the given date, false otherwise
   */
  const hasAppointment = appointments.some(app => compareDates(app.date, fullDate));

  const dayAppointments = appointments
    .filter(app => compareDates(app.date, fullDate))
    /**
     * Sorts an array of applications based on their time property in ascending order.
     * @param {Array} applications - An array of application objects to be sorted.
     * @returns {Array} A new sorted array of applications with the earliest time first.
     */
    .sort((app1, app2) => app1.time - app2.time);

  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);

  const isSelectable = dateNow.getTime() <= fullDate.getTime();
  const isSelected = selectedDate && compareDates(selectedDate, fullDate);

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