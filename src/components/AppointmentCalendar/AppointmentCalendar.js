import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from "@/components/ui/button"

import { getFirstDayOfMonth, getDaysInMonth, daysOfWeek } from '../../base/datetime';

import AppointmentDate from '../AppointmentDate/AppointmentDate';
import AppointmentSelectorContainer from '../AppointmentSelectorContainer/AppointmentSelectorContainer';

export default function AppointmentCalendar({
  appointments,
  selectedMonth,
  selectedYear,
  currentYear,
  slideDirection,
  setSlideDirection,
  showModal,
  onShowModal,
  selectedDate,
  onSelectDate,
  duration,
  onPrevMonth,
  onNextMonth,
  onSetSelectedMonth,
  onSetSelectedYear,
}) {
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  let emptyDates = getFirstDayOfMonth(selectedMonth, selectedYear);

  useEffect(() => {
    if (slideDirection) {
      /**
       * Sets a timer to change the slide direction after a specified duration
       * @param {number} duration - The delay in milliseconds before changing the slide direction
       * @returns {number} The timer ID returned by setTimeout
       /**
        * Cleanup function to clear the timeout timer
        * @returns {Function} A function that clears the timeout when invoked
        */
       */
      const timer = setTimeout(() => {
        setSlideDirection('transition-transform');
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [slideDirection, duration, setSlideDirection]);

  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl ${slideDirection} duration-${duration}`}>
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" onClick={() => onPrevMonth()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <AppointmentSelectorContainer
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          currentYear={currentYear}
          onSelectMonth={onSetSelectedMonth}
          onSelectYear={onSetSelectedYear}
        />
        <Button variant="outline" size="icon" onClick={() => onNextMonth()}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div key={selectedMonth + selectedYear}
        className={`grid grid-cols-7 grid-rows-7 gap-2 h-[500px]`}>
        ```
        /**
         * Renders a list of days of the week
         * @param {string[]} daysOfWeek - An array containing the names of the days of the week
         * @returns {JSX.Element[]} An array of div elements, each representing a day of the week
         */
        ```
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center font-semibold text-sm">{day}</div>
        ))}
        /**
         * Renders empty date placeholders at the beginning of a calendar month view
         * @param {number} emptyDates - The number of empty date slots to render
         * @returns {JSX.Element[]} An array of empty div elements for calendar padding
         */
        {[...Array(emptyDates)].map((_, index) => (
          <div key={`empty-${index}`} className="text-center text-sm"></div>
        ))}
        {[...Array(daysInMonth)].map((_, day) => (
          <AppointmentDate
            key={`date-${day}`}
            day={day}
            month={selectedMonth}
            year={selectedYear}
            appointments={appointments}
            showModal={showModal}
            onShowModal={onShowModal}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
}