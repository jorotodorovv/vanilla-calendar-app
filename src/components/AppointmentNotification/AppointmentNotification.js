import Notification from "../base/Notification/Notification";
import { formatText } from "../../base/string";

/**
 * Renders an appointment notification component
 * @param {Object} props - The component props
 * @param {string} props.message - The message to be displayed in the notification
 * @param {Object} props.placeholders - An object containing placeholder values for the message
 * @param {Function} props.onClose - Callback function to be called when the notification is closed
 * @returns {JSX.Element} A div containing a Notification component with formatted message
 */
const AppointmentNotification = (props) => {
    let message = formatText(props.message, props.placeholders);

    return <div className="relative">
        <Notification
            message={message}
            onClose={props.onClose}
            showTimeout={3000}
            hideTimeout={300}
        />
    </div>
}

export default AppointmentNotification;