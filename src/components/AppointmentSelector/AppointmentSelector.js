import { useEffect, useRef, useState } from "react";

/**
 * AppointmentSelector component for selecting appointments with expandable options
 * @param {string} type - The type of appointment selector
 * @param {Array} options - Array of options to select from
 * @param {number} defaultIndex - The default selected index in the options array
 * @param {Function} mapTo - Function to map options to display values
 * @param {string} expandType - The type of selector that should be expanded
 * @param {Function} onSelect - Callback function when an option is selected
 * @param {Function} onExpand - Callback function when the selector is expanded
 * @returns {JSX.Element} A div containing the appointment selector UI
 */
const AppointmentSelector = ({ type, options, defaultIndex, mapTo, expandType, onSelect, onExpand }) => {
    const MAX_OPTIONS_COUNT = 5;

    let [isExpanded, setExpanded] = useState(false);
    let currentRef = useRef(null);

    /**
     * Scrolls the current element into view when expanded
     * @param {boolean} isExpanded - Indicates whether the element is expanded
     * @param {React.RefObject} currentRef - Reference to the current DOM element
     * @returns {void} This effect does not return a value
     */
    useEffect(() => {
        if (isExpanded && currentRef.current) {
            currentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [isExpanded, currentRef]);

    /**
     * Updates the expanded state based on the comparison of type and expandType
     * @param {void} - No parameters
     * @returns {void} No return value
     */
    useEffect(() => {
        /**
         * Handles the click event on a dropdown option.
         * @param {any} option - The selected option value.
         * @param {number} index - The index of the selected option.
         * @returns {void} This function doesn't return a value.
         */
        if (type !== expandType) {
            setExpanded(false);
        }
    }, [type, expandType]);

    let handleClick = (option, index) => {
        onSelect(option, index);
        setExpanded(false);
    };

    /**
     * Handles the expansion toggle for a component
     /**
      * Renders a list of mapped options as clickable div elements
      * @param {Array} mappedOptions - Array of options to be rendered
      * @param {number} defaultIndex - Index of the default selected option
      * @param {React.RefObject} currentRef - React ref object for the default selected element
      * @param {function} handleClick - Function to handle click events on options
      * @returns {JSX.Element[]} An array of JSX div elements representing the options
      */
     * @param {void} - This function doesn't take any parameters
     * @returns {void} This function doesn't return a value
     */
    let handleExpand = () => {
        onExpand(type);
        setExpanded(!isExpanded);
    };

    let scrollStyle = options.length > MAX_OPTIONS_COUNT ? 'overflow-y-scroll' : null;
    let mappedOptions = options.map(mapTo);

    return <div className="relative z-20">
        <span className="cursor-pointer text-2xl font-bold"
            onClick={handleExpand}>{mappedOptions[defaultIndex]}</span>
        {isExpanded && (
            <div className={`absolute top-full left-0 bg-white shadow-md rounded-lg ${scrollStyle} max-h-60 w-40`}>
                {mappedOptions.map((option, index) => (
                    <div
                        ref={index === defaultIndex ? currentRef : null}
                        key={option + index}
                        className={`p-2 text-center cursor-pointer ${index === defaultIndex ? 'bg-green-300' : ''}`}
                        onClick={() => handleClick(option, index)}>
                        {option}
                    </div>
                ))}
            </div>
        )}
    </div>
}

export default AppointmentSelector;