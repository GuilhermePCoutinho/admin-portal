import { toast } from "react-toastify";
import "react-toastify/dist/react-toastify.css";

function Message(message, type) {
    switch (type) {
        case "error":
            toast.error(message);
            break;

        case "success":
            toast.success(message);
            break;

        case "info":
            toast.info(message);
            break;

        case "warn":
            toast.warn(message);
            break;
        
        default:
            toast(message);
            break;
    }
}

export default Message;