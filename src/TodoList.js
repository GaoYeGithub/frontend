import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <h3>{todo.title}</h3>
            <p>{todo.text}</p>
            <p>Status: {todo.done ? "Done" : "Not Done"}</p>
            <p>Date: {new Date(todo.pub_date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
