import React, { useEffect, useState } from 'react';

import { getFirstDayOfMonth, getDaysInMonth, daysOfWeek } from '../../base/datetime';
import AppointmentDate from '../AppointmentDate/AppointmentDate';

const AppointmentCalendar = ({
    appointments, currentMonth, currentYear,
    slideDirection, setSlideDirection,
    showModal, onShowModal,
    selectedDate, onSelectDate,
    duration }) => {
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

    let dates = [...Array(daysInMonth)].map((_, day) => {
        return <AppointmentDate
            key={day}
            day={day}
            month={currentMonth}
            year={currentYear}
            appointments={appointments}
            showModal={showModal}
            onShowModal={onShowModal}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
        />
    });

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
        {dates}
    </div>;
};

export default AppointmentCalendar;