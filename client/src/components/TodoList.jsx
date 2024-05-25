import React, { useEffect } from "react";

const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <div
      className={
        todos.length === 0 ? "shadow-2xl h-16 p-12" : "mx-auto shadow-2xl rounded-md w-3/5 p-12"
      }
    >
      {todos.length === 0 ? (
        <p className=" text-lg text-center">No tasks available</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="mb-2 p-2 border rounded flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{todo.title}</h3>
                <p>{todo.description}</p>
                <p>Status: {todo.status}</p>
                <p>Due Date: {todo.dueDate}</p>
              </div>
              <div>
                <button
                  onClick={() => onEdit(todo)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
