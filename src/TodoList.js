import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", text: "" });
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleDelete = (id) => {
    fetch(`/api/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => setTodos(todos.filter((todo) => todo._id.$oid !== id)))
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setNewTodo({ title: todo.title, text: todo.text });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`/api/edit/${editingTodo._id.$oid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        console.log("Updated todo:", updatedTodo);
        setTodos(todos.map((todo) => (todo._id.$oid === updatedTodo._id.$oid ? JSON.parse(updatedTodo) : todo)));
        setEditingTodo(null);
        setNewTodo({ title: "", text: "" });
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTodo) {
      handleUpdate(e);
    } else {
      fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      })
        .then((response) => response.json())
        .then((todo) => setTodos([...todos, JSON.parse(todo)]))
        .catch((error) => console.error("Error adding todo:", error));
    }
  };

  return (
    <div className="App">
      <div className="todo-list">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newTodo.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="text"
            placeholder="Description"
            value={newTodo.text}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{editingTodo ? "Update Todo" : "Add Todo"}</button>
        </form>
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo, index) => (
              <li key={index} className="todo-item">
                <h3>{todo.title}</h3>
                <p>{todo.text}</p>
                <p>Status: {todo.done ? "Done" : "Not Done"}</p>
                <p>Date: {new Date(todo.pub_date.$date).toLocaleString()}</p>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo._id.$oid)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="placeholder">No todos available</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
