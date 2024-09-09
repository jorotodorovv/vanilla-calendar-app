function formatTime(hour) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const wholeHour = Math.floor(hour); // Extract whole hour
    const minutes = hour % 1 !== 0 ? '30' : '00'; // Check if there's a half-hour
    const formattedHour = wholeHour % 12 || 12; // Convert 0 to 12 for 12-hour format

    return `${formattedHour}:${minutes} ${period}`;
}

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
const getMonthName = (month, year) => new Date(year, month).toLocaleString('default', { month: 'long' });

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function addHours(date, hours) {
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    return date;
}

function compareDates(d1, d2) {
    let date1 = new Date(+d1);
    let date2 = new Date(+d2);

    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    return date1.getTime() === date2.getTime();
}

export { formatTime, getDaysInMonth, getFirstDayOfMonth, getMonthName, daysOfWeek, addHours, compareDates }