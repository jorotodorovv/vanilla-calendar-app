import Notification from "../base/Notification/Notification";
import { formatText } from "../../base/string";

/**
 * Renders an appointment notification component.
 * @param {Object} props - The component props.
 * @param {string} props.message - The notification message to be displayed.
 * @param {Object} props.placeholders - An object containing placeholder values for the message.
 * @param {function} props.onClose - A callback function to handle closing the notification.
 * @returns {JSX.Element} A div containing a Notification component with the formatted message.
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