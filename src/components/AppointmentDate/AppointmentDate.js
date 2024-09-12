import { useEffect, useMemo, useState } from "react";
import { compareDates, formatTime } from "../../base/datetime";

const AppointmentDate = ({ day, month, year, appointments, showModal, onShowModal, onSelectDate }) => {
    const MAX_APPOINTMENTS = 2;

    const date = day + 1;
    const fullDate = new Date(year, month, date);
    const dateKey = fullDate.toLocaleString('default');

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

    const handleExpandClick = (e, shouldExpand) => {
        e.stopPropagation();
        setExpandedDate(shouldExpand);
    };

    const getAppointmentsForDate = (appointments, fullDate) => {
        return appointments
            .filter(app => compareDates(app.date, fullDate))
            .sort((app1, app2) => {
                return app1.time - app2.time;
            });
    };

    // Check if a date already has an appointment
    const hasAppointment = () => {
        return appointments.some(app => compareDates(app.date, fullDate));
    };

    let dayAppointments = useMemo(
        () => getAppointmentsForDate(appointments, fullDate),
        [appointments, fullDate]);

    return (
        <div
            key={dateKey}
            onClick={() => handleDateClick(day)}
            className={`p-2 sm:p-4 text-sm sm:text-base cursor-pointer rounded-lg relative border hover:bg-green-400 transition duration-200`}>
            {date}

            {/* Appointments List */}
            {dayAppointments.length > 0 && (
                <div className="absolute bottom-1 right-1 text-xs text-red-800">
                    {
                        dayAppointments.length <= MAX_APPOINTMENTS ?
                            dayAppointments.map((app, index) => (
                                <div key={index} className="bg-green-600 text-white rounded px-1 py-0.5 mb-1">
                                    {formatTime(app.time)}
                                </div>
                            )) :
                            <div onClick={(e) => { handleExpandClick(e, true) }}
                                className="bg-green-600 text-white rounded px-1 py-0.5 mb-1 z-10">
                                +{dayAppointments.length}
                            </div>
                    }

                    {/* Expanded Appointment List */}
                    {expandedDate && (
                        <div
                            className="absolute top-1 left-1 bg-white rounded-lg p-2 shadow-lg z-20">
                            {dayAppointments.map((app, index) => (
                                <div key={index} onClick={(e) => { handleExpandClick(e, false) }} className="text-green-800 whitespace-nowrap">
                                    {formatTime(app.time)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AppointmentDate;
