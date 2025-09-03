//Components/Notifications.jsx
const Notification = ({ message, type }) => {
  if (!message) return null;
  const style = {
    color: type === "error" ? "red" : "green",
    background: "#eee",
    border: `2px solid ${type === "error" ? "red" : "green"}`,
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "1rem",
  };
  return <div style={style}>{message}</div>;
};
export default Notification;
