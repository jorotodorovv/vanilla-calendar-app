import React, { useState } from 'react';
import './App.css';

import AppointmentModal from './components/AppointmentModal/AppointmentModal';
import AppointmentNotification from './components/AppointmentNotification/AppointmentNotification';
import AppointmentDate from './components/AppointmentDate/AppointmentDate';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [appointments, setAppointments] = useState([]);

  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // State for month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Days and months for rendering calendar
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const availableHours = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
    '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  // Function to get the number of days in a month
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  // Function to get the first day of the month
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  // Function to navigate to the previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Function to navigate to the next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Handle date click to show modal

  // Check if a date already has an appointment
  const hasAppointment = (day) => {
    return appointments.some(app => app.date === day);
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (day) => {
    return appointments.filter(app => app.date === day);
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">My Calendar</h1>

      {/* Calendar Header */}
      <div className="flex items-center mb-4">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
          onClick={prevMonth}
        >
          &lt;
        </button>
        <div className="mx-4 text-xl font-semibold">
          {`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}
        </div>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
          onClick={nextMonth}
        >
          &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 sm:grid-cols-7 gap-4 bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md lg:max-w-4xl">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center font-semibold text-sm sm:text-base">{day}</div>
        ))}
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={index} className="text-center text-sm sm:text-base"></div>
        ))}
        {[...Array(daysInMonth)].map((_, day) => {
          const dayAppointments = getAppointmentsForDate(day + 1);

          return <AppointmentDate 
            day={day}
            dayAppointments={dayAppointments}
            hasAppointment={hasAppointment}
            onSelectDate={setSelectedDate}
            onShowModal={setShowModal}
            />
        })}
      </div>

      <AppointmentNotification
        message={`Appointment confirmed on ${selectedDate} at ${selectedTimeSlot}`}
        show={showNotification}
        onClose={() => {
          setShowNotification(false);
          setSelectedTimeSlot(null);
        }} />

      {showModal &&
        <AppointmentModal
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          appointments={appointments}
          availableHours={availableHours}
          setSelectedTimeSlot={setSelectedTimeSlot}
          onShowNotification={setShowNotification}
          onSetAppointments={setAppointments}
          onSetShowModal={setShowModal} />}
    </div>
  );
};

export default App;

