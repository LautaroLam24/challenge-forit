function TaskItem({ task, loading, isEditing, onEdit, onDelete }) {
  return (
    <li
      className={`task-item ${task.completed ? "completed" : ""}`}
    >
      <div className="task-main">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        {task.createdAt && (
          <small className="task-date">
            Created: {new Date(task.createdAt).toLocaleString()}
          </small>
        )}
      </div>
      <div className="task-meta">
        <span
          className={`status-badge ${task.completed ? "done" : "pending"}`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
        <div className="task-actions">
          <button
            type="button"
            className="small"
            onClick={() => onEdit(task)}
            disabled={loading || isEditing}
          >
            Edit
          </button>
          <button
            type="button"
            className="small danger"
            onClick={() => onDelete(task.id)}
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;
