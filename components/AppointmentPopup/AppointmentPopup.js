import React from 'react';

import { formatTime } from "../../base/datetime";

const AppointmentPopup = ({
    dayAppointments,
    expandedDate,
    onSetExpandedDate,
}) => {
    const MAX_POPUP_APPOINTMENTS = 2;

    const handleExpandClick = (e, shouldExpand) => {
        e.stopPropagation();
        onSetExpandedDate(shouldExpand);
    };

    return (
        <>
            {dayAppointments.length > 0 && (
                <div className="absolute bottom-1 right-1 text-xs text-red-800">
                    {
                        dayAppointments.length <= MAX_POPUP_APPOINTMENTS ?
                            dayAppointments.map((app, index) => (
                                <div key={index} className="bg-green-600 text-white rounded px-1 py-0.5 mb-1">
                                    {formatTime(app.time)}
                                </div>
                            )) :
                            <div onClick={(e) => handleExpandClick(e, true)}
                                className="bg-green-600 text-white rounded px-1 py-0.5 mb-1 z-10 cursor-pointer">
                                +{dayAppointments.length}
                            </div>
                    }

                    {/* Expanded Appointment List */}
                    {expandedDate && (
                        <div className="absolute top-1 left-1 bg-white rounded-lg p-2 shadow-lg z-20 cursor-pointer">
                            {dayAppointments.map((app, index) => (
                                <div key={index} onClick={(e) => handleExpandClick(e, false)} className="text-green-800 whitespace-nowrap">
                                    {formatTime(app.time)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default AppointmentPopup;