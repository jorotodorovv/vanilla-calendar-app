import { useState } from "react";

const AppointmentDate = ({ day, hasAppointment, dayAppointments, onDateClick }) => {
    const maxVisibleAppointments = 2;
    const dayNumber = day + 1;

    const [expandedDate, setExpandedDate] = useState(false);

    return (
        <div
            key={day}
            className={`p-2 sm:p-4 text-center text-sm sm:text-base cursor-pointer rounded-lg relative 
                ${hasAppointment(dayNumber) ? 'bg-red-400' : 'bg-green-300'} hover:bg-green-400 transition duration-200`}
            onClick={() => onDateClick(dayNumber)}>
            {dayNumber}
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
                    {expandedDate && (
                        <div onClick={() => setExpandedDate(false)} 
                        className="absolute top-1 left-1 bg-white border border-gray-300 rounded-lg p-2 shadow-lg z-20">
                            {dayAppointments.map((app, index) => (
                                <div key={index} className="text-red-800">
                                    {app.time}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AppointmentDate;