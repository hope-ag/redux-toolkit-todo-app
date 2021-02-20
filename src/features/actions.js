import { v1 as uuid } from "uuid";
export const actions = {
  CREATE: "CREATE_TODO",
  EDIT: "EDIT_TODO",
  DELETE: "DELETE_TODO",
  TOGGLE: "TOGGLE_TODO",
  SELECT: "SELECT_TODO",
};

export const createTodoActionCreator = (data) => {
  const { desc } = data;
  return {
    type: actions.CREATE,
    payload: {
      id: uuid(),
      desc,
      isComplete: false,
    },
  };
};
export const editTodoActionCreator = (data) => {
  const { desc, id } = data;
  return {
    type: actions.EDIT,
    payload: {
      id,
      desc,
    },
  };
};
export const deleteTodoActionCreator = (data) => {
  const { id } = data;
  return {
    type: actions.DELETE,
    payload: {
      id,
    },
  };
};
export const toggleTodoActionCreator = (data) => {
  const { id, isComplete } = data;
  return {
    type: actions.TOGGLE,
    payload: {
      id,
      isComplete,
    },
  };
};
export const selectTodoActionCreator = (data) => {
  const { id } = data;
  return {
    type: actions.SELECT,
    payload: {
      id,
    },
  };
};
