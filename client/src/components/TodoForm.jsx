import React, { useState, useEffect } from "react";

const TodoForm = ({
  onCreateTodo,
  onUpdateTodo,
  selectedTodos,
  setSelectedTodos,
}) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: "",
  });

  useEffect(() => {
    if (selectedTodos) {
      setTodo(selectedTodos);
    } else {
      setTodo({ title: "", description: "", status: "", dueDate: "" });
    }
  }, [selectedTodos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTodos) {
      onUpdateTodo(selectedTodos.id, todo);
    } else {
      onCreateTodo(todo);
    }
    setTodo({ title: "", description: "", status: "", dueDate: "" });
    setSelectedTodos(null);
  };

  return (
    <div className="flex flex-col items-center w-auto min-h-36">
      <form onSubmit={handleSubmit} className="mb-4 shadow-2xl rounded-lg p-10">
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            className="p-2 w-72 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={todo.description}
            onChange={handleChange}
            className="p-2 w-72 border rounded h-28"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1">Status</label>
          <select
            name="status"
            value={todo.status}
            onChange={handleChange}
            className=" p-2 border rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={todo.dueDate}
            onChange={handleChange}
            className=" p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-36"
        >
          {selectedTodos ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
