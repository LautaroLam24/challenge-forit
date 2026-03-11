import TaskItem from "./TaskItem.jsx";

function TaskList({
  tasks,
  filteredTasks,
  loading,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onReload,
  onEdit,
  onDelete,
  isEditing,
}) {
  const showEmpty = tasks.length === 0;

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Tasks</h2>
        <button
          type="button"
          className="secondary small"
          onClick={onReload}
          disabled={loading}
        >
          Reload
        </button>
      </div>

      <input
        type="text"
        placeholder="Search tasks by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="filter-buttons">
        <button
          type="button"
          className={statusFilter === "all" ? "small" : "secondary small"}
          onClick={() => setStatusFilter("all")}
        >
          All
        </button>
        <button
          type="button"
          className={
            statusFilter === "completed" ? "small" : "secondary small"
          }
          onClick={() => setStatusFilter("completed")}
        >
          Completed
        </button>
        <button
          type="button"
          className={
            statusFilter === "pending" ? "small" : "secondary small"
          }
          onClick={() => setStatusFilter("pending")}
        >
          Pending
        </button>
      </div>

      {showEmpty ? (
        <p className="empty">No tasks yet.</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              loading={loading}
              isEditing={isEditing}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
