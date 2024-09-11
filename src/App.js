import React, { useEffect, useState } from 'react';
import './App.css';

import AppointmentModal from './components/AppointmentModal/AppointmentModal';
import AppointmentNotification from './components/AppointmentNotification/AppointmentNotification';
import AppointmentDate from './components/AppointmentDate/AppointmentDate';
import AppointmentSelectorContainer from './components/AppointmentSelectorContainer/AppointmentSelectorContainer';
import AppointmentCalendar from './components/AppointmentCalendar/AppointmentCalendar';

const App = () => {
  const currentFullYear = new Date().getFullYear();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [appointments, setAppointments] = useState([]);

  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // State for month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(currentFullYear);

  const [slideDirection, setSlideDirection] = useState(null);

  useEffect(() => {
    setSlideDirection(null);
  }, []);

  // Function to navigate to the previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }

    setSlideDirection('slide-left');
  };

  // Function to navigate to the next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }

    setSlideDirection('slide-right');
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    setSelectedTimeSlot(null);
  };

  return (
    <>
      {showNotification && <AppointmentNotification
        message={`Appointment confirmed on {0}`}
        placeholders={[selectedDate]}
        onClose={handleNotificationClose} />}

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">My Calendar</h1>

        {/* Calendar Header */}
        <div className="flex items-center mb-4">
          <button
            className="px-4 py-2rounded-lg hover:border transition duration-200"
            onClick={prevMonth}
          >
            &lt;
          </button>
          <div className="mx-4 text-xl font-semibold">
            <div className="flex items-center justify-center space-x-4">
              <AppointmentSelectorContainer
                selectedMonth={currentMonth}
                selectedYear={currentYear}
                currentYear={currentFullYear}
                onSelectMonth={setCurrentMonth}
                onSelectYear={setCurrentYear}
              />
            </div>
          </div>
          <button
            className="px-4 py-2 rounded-lg hover:border transition duration-200"
            onClick={nextMonth}
          >
            &gt;
          </button>
        </div>

        {/* Calendar Grid */}
        <AppointmentCalendar
          currentMonth={currentMonth}
          currentYear={currentYear}
          slideDirection={slideDirection}>
          <AppointmentDate
            appointments={appointments}
            showModal={showModal}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onShowModal={setShowModal}
          />
        </AppointmentCalendar>

        {showModal &&
          <AppointmentModal
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            appointments={appointments}
            setSelectedTimeSlot={setSelectedTimeSlot}
            onShowNotification={setShowNotification}
            onSetAppointments={setAppointments}
            onSetShowModal={setShowModal} />}
      </div>
    </>
  );
};

export default App;

