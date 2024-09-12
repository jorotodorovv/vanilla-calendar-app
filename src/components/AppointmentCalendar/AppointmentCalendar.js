import React, { useEffect, useState } from 'react';

import { getFirstDayOfMonth, getDaysInMonth, daysOfWeek } from '../../base/datetime';

const AppointmentCalendar = ({ children, currentMonth, currentYear, slideDirection, setSlideDirection, duration }) => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    let emptyDates = getFirstDayOfMonth(currentMonth, currentYear);

    useEffect(() => {
        if (slideDirection) {
            const timer = setTimeout(() => {
                setSlideDirection('transition-transform');
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [slideDirection]);

    return <div key={currentMonth + currentYear}
        className={
            `grid grid-cols-7 sm:grid-cols-7 gap-4 bg-white p-6 
        rounded-lg shadow-lg w-full sm:max-w-md lg:max-w-4xl 
        transform ${slideDirection} duration-${duration}`}>
        {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center font-semibold text-sm sm:text-base">{day}</div>
        ))}
        {[...Array(emptyDates)].map((_, index) => (
            <div key={index} className="text-center text-sm sm:text-base"></div>
        ))}
        {[...Array(daysInMonth)].map((_, day) => {
            return React.cloneElement(children, {
                day,
                month: currentMonth,
                year: currentYear,
            });
        })}
    </div>;
};

export default AppointmentCalendar;