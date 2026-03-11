import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const emptyForm = {
  id: null,
  title: "",
  description: "",
  completed: false,
};

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Could not load tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Could not load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const onFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (isEditing) {
        const response = await fetch(`${API_BASE_URL}/tasks/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title.trim(),
            description: form.description.trim(),
            completed: form.completed,
          }),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) throw new Error(data?.error || "Could not update task");
        setTasks((prev) =>
          prev.map((task) => (task.id === data.id ? data : task))
        );
      } else {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title.trim(),
            description: form.description.trim(),
          }),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) throw new Error(data?.error || "Could not create task");
        setTasks((prev) => [...prev, data]);
      }

      setForm(emptyForm);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (task) => {
    setForm({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed ?? false,
    });
    setIsEditing(true);
    setError("");
  };

  const cancelEdit = () => {
    setForm(emptyForm);
    setIsEditing(false);
    setError("");
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "Could not delete task");
      setTasks((prev) => prev.filter((task) => task.id !== id));
      if (isEditing && form.id === id) cancelEdit();
    } catch (err) {
      setError(err.message || "Could not delete task");
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => {
      if (statusFilter === "completed") return task.completed;
      if (statusFilter === "pending") return !task.completed;
      return true;
    });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p className="subtitle">Simple CRUD with React & Express</p>
      </header>

      <main className="app-content">
        {error && <div className="alert alert-error">{error}</div>}
        {loading && <div className="loading">Loading...</div>}

        <section className="layout">
          <TaskForm
            form={form}
            isEditing={isEditing}
            loading={loading}
            onFormChange={onFormChange}
            onSubmit={onSubmit}
            onCancel={cancelEdit}
          />

          <TaskList
            tasks={tasks}
            filteredTasks={filteredTasks}
            loading={loading}
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onReload={loadTasks}
            onEdit={startEdit}
            onDelete={deleteTask}
            isEditing={isEditing}
          />
        </section>
      </main>
    </div>
  );
}

export default TasksPage;
