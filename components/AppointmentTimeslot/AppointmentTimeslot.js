import { compareDates, formatTime } from "../../base/datetime";

const AppointmentTimeslot = ({ index, selectedDate, time, appointments, onSelectTimeSlot }) => {
    const isTimeSlotTaken = (date, time) => {
        return appointments.some(app =>
            compareDates(app.date, date) && app.time === time);
    };

    const handleClickTimeslot = (time) => {
        if (!isTimeSlotTaken(selectedDate, time)) {
            onSelectTimeSlot(time);
        }
    };

    let timeslotStyles = isTimeSlotTaken(selectedDate, time) ? 'bg-red-400 cursor-not-allowed' : 'border hover:bg-green-400';

    return <li key={index}>
        <button
            className={`w-full py-2 px-4 text-sm sm:text-base rounded-lg transition duration-200 ${timeslotStyles}`}
            onClick={() => handleClickTimeslot(time)}
            disabled={isTimeSlotTaken(selectedDate, time)}>
            {formatTime(time)}
        </button>
    </li>
};

export default AppointmentTimeslot;