//components/store.js
import { configureStore } from "@reduxjs/toolkit"; //RTK - redux toolkit
import reducer from "../reducers/anecdoteReducer";
import filterReducer from "../reducers/filterReducer";
import notificationReducer from "../reducers/notificationReducer";
const store = configureStore({
  reducer: {
    anecdotes: reducer, //keeps one piece of anecodtes and manage it using anecdoteReducer
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;
