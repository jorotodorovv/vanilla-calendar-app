import { useEffect, useState } from "react";
import { compareDates } from "../../base/datetime";
import AppointmentPopup from "../AppointmentPopup/AppointmentPopup";
import { cn } from "@/lib/utils"

export default function AppointmentDate({ day, month, year, appointments, showModal, onShowModal, onSelectDate, selectedDate }) {
  const date = day + 1;
  const currentDate = new Date(year, month, date);

  const [expandedDate, setExpandedDate] = useState(false);

  useEffect(() => {
    setExpandedDate(false);
  }, [month, showModal]);

  const handleDateClick = () => {
    onSelectDate(currentDate);
    onShowModal(true);
    setExpandedDate(false);
  };

  const hasAppointment = appointments.some(app => compareDates(app.date, currentDate));

  const dayAppointments = appointments
    .filter(app => compareDates(app.date, currentDate, true))
    .sort((app1, app2) => app1.time - app2.time);

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