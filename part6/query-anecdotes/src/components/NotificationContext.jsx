import React, { createContext, useReducer, useContext } from "react";
// createContext creates a context object that can hold state and functions and lets any components subscribe to it without needing to pass the props
//useReducer : handles complex states especially when the next state depends upon the current state
//useContext : hook that allows components to use the context we created using createContext
const NotificationContext = createContext(); //a blank container for now

const NotificationReducer = (state, action) => {
  //reducer : a pure function that receives state and action
  //state : current state, action : an object describing what you want to do
  switch (action.type) {
    case "SET":
      return { message: action.payload };
    case "CLEAR":
      return { message: "" };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  //NotificationProvider is a wrapper component which makes the notification  component available to all children inside it
  const [state, dispatch] = useReducer(NotificationReducer, { message: "" });
  //   here state : current state here empty message, dispatch: a function we call to trigger an action
  return (
    // value : elements that we want components to access from the context
    // children : representation of all the components which can access the value from the context
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
// helper function : Instead of writing useContext(NotificationContext) every time, we just call useNotification()
// //Returns the state + dispatch object from the nearest NotificationProvider.
