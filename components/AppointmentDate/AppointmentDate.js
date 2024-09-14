import { useEffect, useState } from "react";
import { compareDates } from "../../base/datetime";

import AppointmentPopup from "../AppointmentPopup/AppointmentPopup";

const AppointmentDate = ({ day, month, year, appointments, showModal, onShowModal, onSelectDate }) => {
    const date = day + 1;
    const fullDate = new Date(year, month, date);

    const [expandedDate, setExpandedDate] = useState(false);

    useEffect(() => {
        setExpandedDate(false);
    }, [month]);

    useEffect(() => {
        if (showModal) {
            setExpandedDate(false);
        }
    }, [showModal]);

    const handleDateClick = (day) => {
        onSelectDate(fullDate);
        onShowModal(true);
        setExpandedDate(false);
    };

    // Check if a date already has an appointment
    const hasAppointment = () => {
        return appointments.some(app => compareDates(app.date, fullDate));
    };

    const dayAppointments = appointments ? appointments
        .filter(app => compareDates(app.date, fullDate))
        .sort((app1, app2) => {
            return app1.time - app2.time;
        }) : [];

    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);

    let className = dateNow.getTime() <= fullDate.getTime() ? 'border cursor-pointer hover:bg-green-400 transition duration-200' : ' bg-gray-100';
    let onClick = dateNow.getTime() <= fullDate.getTime() ? () => handleDateClick(day) : null;

    return (
        <div
            key={year + month + date}
            onClick={onClick}
            className={`p-2 sm:p-4 text-sm sm:text-base rounded-lg relative ${className}`}>
            {date}

            {dayAppointments.length > 0 && (
                <AppointmentPopup
                    dayAppointments={dayAppointments}
                    expandedDate={expandedDate}
                    onSetExpandedDate={setExpandedDate}
                />
            )}
        </div>
    );
};

export default AppointmentDate;
