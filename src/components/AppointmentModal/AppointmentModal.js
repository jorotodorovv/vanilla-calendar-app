import { useEffect, useMemo } from "react";
import { addHours, compareDates, formatTime } from "../../base/datetime";

const AppointmentModal = (props) => {
  const availableHours = useMemo(() => Array.from({ length: 10 }, (_, i) => i + 9));

  useEffect(() => {
    return () => {
      props.setSelectedTimeSlot(null);
    };
  }, []);

  const isTimeSlotTaken = (date, time) => {
    return props.appointments.some(app =>
      compareDates(app.date, date) && app.time === time);
  };

  // Handle confirmation of the appointment
  const confirmAppointment = () => {
    let date = addHours(props.selectedDate, props.selectedTimeSlot);

    props.onSetAppointments([...props.appointments, { date, time: props.selectedTimeSlot }]);

    props.onSetShowModal(false);
    props.onShowNotification(true);
  };

  const handleClickTimeslot = (time) => {
    if (!isTimeSlotTaken(props.selectedDate, time)) {
      props.setSelectedTimeSlot(time);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Select a time for {props.selectedDate.getDay()}</h2>
        <ul className="grid grid-cols-2 gap-4">
          {availableHours.map((time, index) => (
            <li key={index}>
              <button
                className={`w-full py-2 px-4 text-sm sm:text-base rounded-lg transition duration-200
                ${isTimeSlotTaken(props.selectedDate, time) ? 'bg-red-400 cursor-not-allowed' : 'border hover:bg-green-400'}`}
                onClick={() => handleClickTimeslot(time)}
                disabled={isTimeSlotTaken(props.selectedDate, time)}>
                {formatTime(time)}
              </button>
            </li>
          ))}
        </ul>
        {props.selectedTimeSlot && (
          <div className="mt-4">
            <p className="mb-2 text-sm sm:text-base">You selected <span className="font-bold">{formatTime(props.selectedTimeSlot)}</span></p>
            <button
              className="w-full py-2 px-4 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition duration-200"
              onClick={confirmAppointment}>
              Confirm Appointment
            </button>
          </div>
        )}
        <button
          className="mt-4 w-full py-2 px-4 bg-gray-300 text-sm sm:text-base rounded-lg hover:bg-gray-400 transition duration-200"
          onClick={() => props.onSetShowModal(false)}>
          Close
        </button>
      </div>
    </div>
  )
}

export default AppointmentModal;