const LOCALE = process.env.LOCALE || 'bg';
const TIME_ZONE = process.env.TIME_ZONE || 'Europe/Sofia';

const formatDate = (date) => date.toLocaleString(LOCALE, { timezone: TIME_ZONE });
const formatTime = (date) => date.toLocaleTimeString(LOCALE, { timezone: TIME_ZONE, hour: '2-digit', minute: '2-digit' });

const getHours = (start, interval, hours) => Array.from({ length: hours * (1 / interval) }, (_, i) => start + interval * i);

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getMonthName = (month, year) => new Date(year, month).toLocaleString(LOCALE, { month: 'long' });

function getDaysOfWeek() {
    const baseDate = new Date(Date.UTC(2021, 0, 4));
    const daysOfWeek = [];

    for (let i = 0; i < 7; i++) {
        const day = new Date(baseDate);
        day.setDate(baseDate.getDate() + i);
        daysOfWeek.push(day.toLocaleString(LOCALE, { weekday: 'short' }));
    }

    return daysOfWeek;
}

const daysOfWeek = getDaysOfWeek();

function addTime(date, hours, minutes) {
    let newDate = new Date(date);

    newDate.setHours(hours, minutes, 0, 0);

    return newDate;
}

function compareDates(d1, d2, excludeTime) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);

    if (excludeTime) {
        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);
    }

    return date1.getTime() === date2.getTime();
}

const getFirstDayOfMonth = (month, year) => {
    let firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
};

export { formatDate, formatTime, getHours, getDaysInMonth, getFirstDayOfMonth, getMonthName, daysOfWeek, addTime, compareDates }