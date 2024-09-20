import React, { useEffect, useState } from 'react';
import prisma from '../lib/prisma';

import AppointmentModal from '../components/AppointmentModal/AppointmentModal';
import AppointmentNotification from '../components/AppointmentNotification/AppointmentNotification';
import AppointmentCalendar from '../components/AppointmentCalendar/AppointmentCalendar';
import { formatDate, formatTime } from '../base/datetime';

const Home = ({ appointmentsData }) => {
  const currentYear = new Date().getFullYear();

  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // State for month and year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [appointments, setAppointments] = useState([]);

  const [slideDirection, setSlideDirection] = useState('transition-transform');

  ```
  /**
   * Effect hook to initialize slide direction and appointments
   * @param {Array} appointmentsData - The initial appointments data
   * @returns {void} This effect does not return anything
   */
  ```
  useEffect(() => {
    setSlideDirection(null);
    setAppointments(appointmentsData);
  }, []);

  ```
  /**
   * Handles the action of moving to the previous month in a calendar interface.
   * If the current month is January, it sets the month to December and decrements the year.
   * Otherwise, it simply decrements the month.
   * Also sets the slide direction for animation purposes.
   * @param {void} - This function doesn't take any parameters
   * @returns {void} This function doesn't return a value
   */
  ```
  const handlePrevMonth = () => {
    ```
    /**
     * Handles the action of moving to the next month in a calendar.
     * If the current month is December, it moves to January of the next year.
     * Otherwise, it moves to the next month of the current year.
     * Also sets the slide direction for animation purposes.
     * @param {void} - This function doesn't take any parameters
     * @returns {void} This function doesn't return a value
     */
    ```
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }

    setSlideDirection('slide-left');
  };

  const handleNextMonth = () => {
    /**
     * Handles the closing of a notification by resetting related state variables.
     * @returns {void} This function doesn't return a value.
     */
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }

    setSlideDirection('slide-right');
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    setSelectedTimeSlot(null);
    setError(null);
  };

  return (
    <>
      {showNotification && <AppointmentNotification
        message={error ? error : `Appointment confirmed on {0}`}
        placeholders={[formatDate(selectedDate)]}
        onClose={handleNotificationClose} />}

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">My Calendar</h1>
        <AppointmentCalendar
          duration={200}
          appointments={appointments}
          currentYear={currentYear}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onSetSelectedMonth={setSelectedMonth}
          onSetSelectedYear={setSelectedYear}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          showModal={showModal}
          onShowModal={setShowModal}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          slideDirection={slideDirection}
          setSlideDirection={setSlideDirection} />

        {showModal &&
          <AppointmentModal
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            appointments={appointments}
            setSelectedTimeSlot={setSelectedTimeSlot}
            onShowNotification={setShowNotification}
            onSelectDate={setSelectedDate}
            onSetError={setError}
            onSetAppointments={setAppointments}
            onSetShowModal={setShowModal} />}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const appointments = await prisma.appointment.findMany();

    /**
     * Maps appointments to a new format with additional time-related properties
     * @param {Array} appointments - An array of appointment objects
     * @returns {Array} An array of mapped appointment objects with id, date, time, hour, and minute properties
     */
    const mappedAppointments = appointments.map(app => {
      const localTime = formatTime(app.date);
      const [hour, minute, _] = localTime.split(/:| /);

      return {
        id: app.id,
        date: app.date.toISOString(),
        time: localTime,
        hour: Number(hour),
        minute: Number(minute),
      }
    });

    return { props: { appointmentsData: mappedAppointments } };
  }
  catch (ex) {
    return { props: { appointmentsData: [] } };
  }
};

export default Home;