import React from "react";

interface Todo {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
}

export const TodoItem = ({ todo, onDelete }: { todo: Todo; onDelete: (id: string) => void }) => {
  return (
    <div className="border p-2 rounded flex justify-between items-center">
      <div>
        <p className="font-medium">{todo.title}</p>
        {todo.description && <p className="text-sm text-gray-600">{todo.description}</p>}
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:underline text-sm"
      >
        Delete
      </button>
    </div>
  );
};
