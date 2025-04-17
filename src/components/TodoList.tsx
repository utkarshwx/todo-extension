import React, { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";

interface Todo {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const fetchTodos = async () => {
    setLoading(true);
    const { token } = await chrome.storage.local.get('token');

    if (!token) {
      setError('Not logged in');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://todo.heapmind.com/api/todos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to load todos");
      }

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      setTodos(data);
    } catch (err: any) {
      console.error("Fetch todos failed:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    const { token } = await chrome.storage.local.get('token');

    if (!token) {
      alert("Not logged in");
      return;
    }

    if (!title.trim()) {
      alert("Title cannot be empty");
      return;
    }

    const formattedDeadline = deadline
      ? new Date(deadline).toISOString()
      : undefined;

    try {
      const res = await fetch("https://todo.heapmind.com/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, deadline: formattedDeadline }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to add todo");
      }

      setTodos((prev) => [data, ...prev]);
      setTitle('');
      setDescription('');
      setDeadline('');
    } catch (err: any) {
      console.error("Add todo failed:", err);
      alert(err.message || "Something went wrong");
    }
  };

  const deleteTodo = async (id: string) => {
    const { token } = await chrome.storage.local.get("token");

    try {
      const res = await fetch(`https://todo.heapmind.com/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      } else {
        const err = await res.json();
        alert(err?.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold">Your Tasks</h2>

      {/* Add Todo */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Deadline"
          className="w-full p-2 border rounded"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      {todos.length === 0 ? (
        <div>No tasks yet! 🎉</div>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
        ))
      )}
    </div>
  );
};
