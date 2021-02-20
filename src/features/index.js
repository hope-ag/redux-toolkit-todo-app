import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { counterReducer, selectedTodoReducer, todosReducer } from "./reducers";

const reducers = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  selected: selectedTodoReducer,
});

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
