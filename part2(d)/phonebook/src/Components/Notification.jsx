import React from "react";
import "./Notification.css";
const Notification = ({ message, messageType }) => {
  if (message === null) return null;
  return (
    <div className={messageType === "success" ? "success" : "error"}>
      {message}
    </div>
  );
};

export default Notification;
