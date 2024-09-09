import Notification from "../base/Notification/Notification";

const AppointmentNotification = (props) => {
    return <div className="relative h-screen w-screen">
        {props.show && <Notification
            message={props.message}
            onClose={props.onClose}
            showTimeout={3000}
            hideTimeout={300}
        />}
    </div>
}

export default AppointmentNotification;