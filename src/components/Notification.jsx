import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const Notification = () => {
  const { notification, setNotification } = useContext(NotificationContext);
  console.log(notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (notification) {
    return <div style={style}>{notification.message}</div>;
  } else {
    return;
  }
};

export default Notification;
