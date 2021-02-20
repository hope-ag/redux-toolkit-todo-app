import { todos } from "../App/data";
import { actions as actionTypes } from "./actions";

//Reducers

export const todosReducer = (state = todos, action) => {
  switch (action.type) {
    case actionTypes.DELETE:
      return state.filter((todo) => todo.id !== action.payload.id);
    case actionTypes.CREATE:
      return [...state, action.payload];

    case actionTypes.EDIT:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, desc: action.payload.desc }
          : todo
      );
    case actionTypes.TOGGLE:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isComplete: action.payload.isComplete }
          : todo
      );

    default:
      return state;
  }
};

export const selectedTodoReducer = (state = "", action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SELECT:
      return payload.id;
    default:
      return state;
  }
};

export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return state + 1;
    case actionTypes.DELETE:
      return state + 1;
    case actionTypes.TOGGLE:
      return state + 1;
    case actionTypes.EDIT:
      return state + 1;
    default:
      return state;
  }
};
