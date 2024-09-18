const LOCALE = 'en';
const TIME_ZONE = 'Europe/Sofia';

function formatTime(time) {
    const hour = Math.floor(time);
    const minutes = (time - hour) * 60;

    const date = new Date(0, 0, 0, hour, minutes);

    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formatter = new Intl.DateTimeFormat(LOCALE, options);
    const formattedTime = formatter.format(date);

    return formattedTime;
}

const formatDate = (date) => date.toLocaleString(LOCALE);

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

function addHours(date, hours) {
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    return date;
}

function compareDates(d1, d2) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);

    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    return date1.getTime() === date2.getTime();
}

const getFirstDayOfMonth = (month, year) => {
    let firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
};

export { formatTime, formatDate, getHours, getDaysInMonth, getFirstDayOfMonth, getMonthName, daysOfWeek, addHours, compareDates, LOCALE, TIME_ZONE }