import React, { createContext, useReducer, useContext } from "react";

// Määritellään notifikaation tilaan liittyvä reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return { message: action.message };
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, null);

  const setNotification = (message) => {
    dispatch({ type: "SET", message });
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{ notification: state, setNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
