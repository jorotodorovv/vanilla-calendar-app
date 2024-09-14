import { useState } from "react";
import { getMonthName } from "../../base/datetime";
import AppointmentSelector from "../AppointmentSelector/AppointmentSelector";

const AppointmentSelectorContainer = (
    {
        selectedMonth,
        selectedYear,
        currentYear,
        onSelectMonth,
        onSelectYear
    }) => {
    const months = Array.from({ length: 12 }, (_, i) => i);
    const years = [currentYear - 1, currentYear, currentYear + 1]

    const [expandSelector, setExpandSelector] = useState(null);

    return <>
        <AppointmentSelector
            type='month'
            options={months}
            defaultIndex={selectedMonth}
            mapTo={(month) => getMonthName(month, currentYear)}
            expandType={expandSelector}
            onExpand={setExpandSelector}
            onSelect={(_, month) => { onSelectMonth(month) }} />
        <AppointmentSelector
            type='year'
            options={years}
            defaultIndex={years.indexOf(selectedYear)}
            mapTo={(year) => year}
            expandType={expandSelector}
            onExpand={setExpandSelector}
            onSelect={(year, _) => { onSelectYear(year) }} />
    </>
};

export default AppointmentSelectorContainer;