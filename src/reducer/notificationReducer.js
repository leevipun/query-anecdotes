import { useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return;
    case "CLEAR":
      return;
    default:
      return null;
  }
};
