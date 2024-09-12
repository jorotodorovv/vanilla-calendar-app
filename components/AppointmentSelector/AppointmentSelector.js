import { useEffect, useRef, useState } from "react";

const AppointmentSelector = ({ type, options, defaultIndex, mapTo, expandType, onSelect, onExpand }) => {
    const MAX_SCROLLLESS_OPTION_COUNT = 5;

    let [isExpanded, setExpanded] = useState(false);
    let currentRef = useRef(null);

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

    let handleClick = (option, index) => {
        onSelect(option, index);
        setExpanded(false);
    };

    let handleExpand = () => {
        onExpand(type);
        setExpanded(!isExpanded);
    };

    let scrollStyle = options.length > MAX_SCROLLLESS_OPTION_COUNT ? 'overflow-y-scroll' : null;
    let mappedOptions = options.map(mapTo);

    return <div className="relative z-20">
        <span className="cursor-pointer"
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