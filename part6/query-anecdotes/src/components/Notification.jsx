import { useEffect } from "react";
import { useNotification } from "./NotificationContext";
const Notification = () => {
  const { state, dispatch } = useNotification();

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        dispatch({
          type: "CLEAR",
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.message, dispatch]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!state.message) return null;

  return <div style={style}>{state.message}</div>;
};

export default Notification;
