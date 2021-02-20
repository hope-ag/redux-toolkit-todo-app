import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { todos } from "./data";
import { v1 as uuid } from "uuid";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  selectTodoActionCreator,
  toggleTodoActionCreator,
  deleteTodoActionCreator,
  createTodoActionCreator,
  editTodoActionCreator,
} from "../features/actions";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.todos);
  const editedCount = useSelector((store) => store.counter);
  const selectedTodoId = useSelector((store) => store.selected);
  const [newTodoInput, setNewTodoInput] = useState("");
  const [editTodoInput, setEditTodoInput] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const editInput = useRef(null);
  const selectedTodo =
    (selectedTodoId && todos.find((todo) => todo.id === selectedTodoId)) ||
    null;

  const handleNewInputChange = (e) => {
    setNewTodoInput(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setEditTodoInput(e.target.value);
  };
  // Creates a new todo from the main input
  const handleCreateNewTodo = (e) => {
    e.preventDefault();
    if (!newTodoInput) return;
    dispatch(
      createTodoActionCreator({
        desc: newTodoInput,
      })
    );
    setNewTodoInput("");
  };

  const handleSelectTodo = (todoId) => () => {
    dispatch(selectTodoActionCreator({ id: todoId }));
  };
  // Makes the todo item editable
  const handleEdit = () => {
    if (!selectedTodo) return;

    setEditTodoInput(selectedTodo.desc);
    setIsEditMode(true);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      editTodoActionCreator({ id: selectedTodoId, desc: editTodoInput })
    );
    setIsEditMode(false);
    setEditTodoInput("");
  };
  //Used to cancel out of the edit mode
  const handleCancelUpdate = (e) => {
    e.preventDefault();
    setIsEditMode(false);
    setEditTodoInput("");
  };

  const handleToggle = () => {
    if (!selectedTodoId && !selectedTodo) return;
    dispatch(
      toggleTodoActionCreator({
        id: selectedTodo.id,
        isComplete: !selectedTodo.isComplete,
      })
    );
  };
  const handleDelete = () => {
    if (!selectedTodoId) return;
    dispatch(deleteTodoActionCreator({ id: selectedTodoId }));
  };
  //UseEffect

  useEffect(() => {
    if (isEditMode) {
      editInput?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <div className='App'>
      <div className='App__counter'>
        {" "}
        <h1>Todo: Redux</h1> <p>Todos Updated Count: {editedCount}</p>
      </div>
      <div className='App__banner'>
        <form onSubmit={handleCreateNewTodo}>
          <label htmlFor='new-todo'>Add new:</label>
          <input
            onChange={handleNewInputChange}
            id='new-todo'
            value={newTodoInput}
          />

          <button type='submit'>Create</button>
        </form>
        <div className='App_todo-info'>
          {selectedTodo === null ? (
            <span className='empty-state'>No Todo Selected</span>
          ) : !isEditMode ? (
            <>
              <span className='selectedTxt'>
                {" "}
                <h2>Selected Todo:</h2>
                <span
                  className={`todo-desc ${selectedTodo?.isComplete ? "n" : ""}`}
                >
                  <p>{selectedTodo.desc}</p>
                </span>
              </span>
              <div>
                <div className='todo-actions'>
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={handleToggle}>Toggle</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdate}>
              <label htmlFor='edit-todo'>Edit:</label>
              <input
                className='edit-input'
                ref={editInput}
                onChange={handleEditInputChange}
                value={editTodoInput}
              />
              <button type='submit'>Update</button>
              <button onClick={handleCancelUpdate}>Cancel</button>
            </form>
          )}
        </div>
      </div>
      <div className='App__body'>
        <ul className='App__list'>
          <h2>My Todos:</h2>
          {todos.map((todo, i) => (
            <li
              className={`${todo.isComplete ? "done" : "not-done"} ${
                todo.id === selectedTodoId ? "active" : ""
              }`}
              key={todo.id}
              onClick={handleSelectTodo(todo.id)}
            >
              <span className='list-number'>{i + 1}.</span> {todo.desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
