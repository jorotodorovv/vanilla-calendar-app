import React, { useEffect, useState } from 'react';
import prisma from '../lib/prisma';

import AppointmentModal from '../components/AppointmentModal/AppointmentModal';
import AppointmentNotification from '../components/AppointmentNotification/AppointmentNotification';
import AppointmentCalendar from '../components/AppointmentCalendar/AppointmentCalendar';

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

  useEffect(() => {
    setSlideDirection(null);
    setAppointments(appointmentsData);
  }, []);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }

    setSlideDirection('slide-left');
  };

  const handleNextMonth = () => {
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
        placeholders={[selectedDate]}
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