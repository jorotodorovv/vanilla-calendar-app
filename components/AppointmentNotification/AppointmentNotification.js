import Notification from "../base/Notification/Notification";
import { formatText } from "../../base/string";

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