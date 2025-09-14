//Components/Togglable.jsx
import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div>
      {/* {!visible && ( //why !visible or false condition initially? Because we visible is false by default (Initially)
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        )} */}
      <button onClick={toggleVisibility}>
        {visible ? "cancel" : props.buttonLabel}
      </button>

      {visible && <div>{props.children}</div>}
    </div>
  );
};

export default Togglable;
