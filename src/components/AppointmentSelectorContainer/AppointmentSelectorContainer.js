import { useState } from "react";
import { getMonthName } from "../../base/datetime";
import AppointmentSelector from "../AppointmentSelector/AppointmentSelector";

```
/**
 * Container component for selecting appointment month and year
 * @param {number} selectedMonth - The currently selected month (0-11)
 * @param {number} selectedYear - The currently selected year
 * @param {number} currentYear - The current year
 * @param {function} onSelectMonth - Callback function for month selection
 * @param {function} onSelectYear - Callback function for year selection
 * @returns {JSX.Element} A div containing AppointmentSelector components for month and year
 */
```
const AppointmentSelectorContainer = (
    {
        selectedMonth,
        selectedYear,
        currentYear,
        onSelectMonth,
        onSelectYear
    }) => {
    ```
    /**
     * Creates an array of numbers representing months (0-11).
     * @returns {number[]} An array containing numbers from 0 to 11, representing months from January to December.
     */
    ```
    const months = Array.from({ length: 12 }, (_, i) => i);
    const years = [currentYear - 1, currentYear, currentYear + 1]

    const [expandSelector, setExpandSelector] = useState(null);

    return <div className="flex space-x-4">
        <AppointmentSelector
            type='month'
            options={months}
            defaultIndex={selectedMonth}
            /**
             * Maps a month number to its corresponding name
             * @param {number} month - The month number (1-12)
             * @returns {string} The full name of the month
             */
            mapTo={(month) => getMonthName(month, currentYear)}
            expandType={expandSelector}
            onExpand={setExpandSelector}
            /**
             * Handles the selection of a month
             * @param {Event} _ - The event object (unused)
             * @param {number|string} month - The selected month
             * @returns {void} This function does not return a value
             */
            onSelect={(_, month) => { onSelectMonth(month) }} />
        <AppointmentSelector
            type='year'
            options={years}
            defaultIndex={years.indexOf(selectedYear)}
            /**
             * Maps a year value to itself
             * @param {number} year - The year to be mapped
             /**
              * Handles the selection of a year
              * @param {number} year - The selected year
              * @param {any} _ - Unused parameter
              * @returns {void} This function doesn't return a value
              */
             * @returns {number} The same year value that was passed in
             */
            mapTo={(year) => year}
            expandType={expandSelector}
            onExpand={setExpandSelector}
            onSelect={(year, _) => { onSelectYear(year) }} />
    </div>
};

export default AppointmentSelectorContainer;