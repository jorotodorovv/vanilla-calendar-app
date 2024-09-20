import { useEffect, useRef, useState } from "react";

/**
 * A component for selecting appointments with expandable options.
 * @param {Object} props - The component props.
 * @param {string} props.type - The type of appointment selector.
 * @param {Array} props.options - The list of options to choose from.
 * @param {number} props.defaultIndex - The index of the default selected option.
 * @param {Function} props.mapTo - A function to map options to displayed values.
 * @param {string} props.expandType - The type of expansion to apply.
 * @param {Function} props.onSelect - Callback function when an option is selected.
 * @param {Function} props.onExpand - Callback function when the selector is expanded.
 * @returns {JSX.Element} A div containing the appointment selector UI.
 */
const AppointmentSelector = ({ type, options, defaultIndex, mapTo, expandType, onSelect, onExpand }) => {
    const MAX_OPTIONS_COUNT = 5;

    let [isExpanded, setExpanded] = useState(false);
    let currentRef = useRef(null);

    /**
     * Scrolls the current element into view when expanded
     * @param {boolean} isExpanded - Indicates whether the element is expanded
     * @param {React.RefObject} currentRef - Reference to the current element
     * @returns {void} This effect does not return a value
     */
    ```
    /**
     * A React useEffect hook that manages the expansion state based on the type and expandType.
     * @param {function} effect - The effect function to be executed.
     * @param {Array} dependencies - An array containing type and expandType as dependencies.
     * @returns {undefined} This effect does not return anything.
     */
    ```
    useEffect(() => {
        if (isExpanded && currentRef.current) {
            currentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [isExpanded, currentRef]);

    useEffect(() => {
        if (type !== expandType) {
            setExpanded(false);
        }
    }, [type, expandType]);

    /**
     * Handles the click event on a dropdown option
     * @param {*} option - The selected option value
     * @param {number} index - The index of the selected option
     * @returns {void} This function doesn't return a value
     */
    let handleClick = (option, index) => {
        onSelect(option, index);
        setExpanded(false);
    };

    /**
     * Handles the expansion toggle for a component
     * @param {void} - This function doesn't take any parameters
     * @returns {void} This function doesn't return anything
     */
    let handleExpand = () => {
        onExpand(type);
        /**
         * Renders a list of mapped options as clickable div elements
         * @param {Array} mappedOptions - An array of option values to be rendered
         * @param {number} defaultIndex - The index of the default selected option
         * @param {React.RefObject} currentRef - Reference to the currently selected option's div
         * @param {function} handleClick - Function to handle click events on options
         * @returns {React.ReactNode} A list of div elements representing the options
         */
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