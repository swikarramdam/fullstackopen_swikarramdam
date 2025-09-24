import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification); //state is a global variable with its values as initialStates
  if (!notification) return null;
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};
export default Notification;
