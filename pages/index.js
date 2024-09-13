import React, { useEffect, useState } from 'react';
import prisma from '../lib/prisma';

import AppointmentModal from '../components/AppointmentModal/AppointmentModal';
import AppointmentNotification from '../components/AppointmentNotification/AppointmentNotification';
import AppointmentSelectorContainer from '../components/AppointmentSelectorContainer/AppointmentSelectorContainer';
import AppointmentCalendar from '../components/AppointmentCalendar/AppointmentCalendar';

const Home = ({ appointmentsData }) => {
  const currentFullYear = new Date().getFullYear();

  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // State for month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(currentFullYear);

  const [appointments, setAppointments] = useState([]);

  const [slideDirection, setSlideDirection] = useState('transition-transform');

  useEffect(() => {
    setSlideDirection(null);
    setAppointments(appointmentsData);
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
    setError(null);
  };

  return (
    <>
      {showNotification && <AppointmentNotification
        message={error ? error : `Appointment confirmed on {0}`}
        placeholders={[selectedDate]}
        onClose={handleNotificationClose} />}

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">My Calendar</h1>

        {/* Calendar Header */}
        <div className="flex items-center mb-4">
          <button
            className="px-4 py-2rounded-lg hover:border transition duration-200"
            onClick={prevMonth}>
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
            onClick={nextMonth}>
            &gt;
          </button>
        </div>

        <AppointmentCalendar
          duration={200}
          appointments={appointments}
          currentMonth={currentMonth}
          currentYear={currentYear}
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

    const mappedAppointments = appointments.map(app => ({
      id: app.id,
      date: app.date.toString(),
      time: app.date.getHours() + (app.date.getMinutes() === 30 ? 0.5 : 0),
    }));

    return { props: { appointmentsData: mappedAppointments } };
  }
  catch {
    return { props: { appointmentsData: [] } };
  }
};

export default Home;