//reducers/index.js
import { combineReducers } from "redux";
import reducer from "./anecdoteReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  anecdotes: reducer,
  filter: filterReducer,
});

export default rootReducer;
