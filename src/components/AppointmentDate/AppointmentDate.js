import { useState } from "react";

const AppointmentDate = ({ day, hasAppointment, dayAppointments, onShowModal, onSelectDate }) => {
    const maxVisibleAppointments = 2;
    const date = day + 1;

    const [expandedDate, setExpandedDate] = useState(false);

    const handleDateClick = (selectedDate) => {
        onSelectDate(selectedDate);
        onShowModal(true);
        setExpandedDate(false);
    };

    return (
        <div
            className={`p-2 sm:p-4 text-center text-sm sm:text-base cursor-pointer rounded-lg relative 
                ${hasAppointment(date) ? 'bg-red-400' : 'bg-green-300'} hover:bg-green-400 transition duration-200`}
        >
            {/* Date Number */}
            <div onClick={() => handleDateClick(date)}>
                {date}
            </div>

            {/* Appointments List */}
            {dayAppointments.length > 0 && (
                <div className="absolute bottom-1 right-1 text-xs text-red-800">
                    {
                        dayAppointments.length <= maxVisibleAppointments ?
                            dayAppointments.map((app, index) => (
                                <div key={index} className="bg-red-600 text-white rounded px-1 py-0.5 mb-1">
                                    {app.time}
                                </div>
                            )) :
                            <div onClick={() => setExpandedDate(true)} className="bg-red-600 text-white rounded px-1 py-0.5 mb-1 z-10">
                                +{dayAppointments.length}
                            </div>
                    }

                    {/* Expanded Appointment List */}
                    {expandedDate && (
                        <div
                            className="absolute top-1 left-1 bg-white border border-gray-300 rounded-lg p-2 shadow-lg z-20">
                            {dayAppointments.map((app, index) => (
                                <div key={index} onClick={() => setExpandedDate(false)} className="text-red-800">
                                    {app.time}
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
