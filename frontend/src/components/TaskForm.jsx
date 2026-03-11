function TaskForm({
  form,
  isEditing,
  loading,
  onFormChange,
  onSubmit,
  onCancel,
}) {
  const canSubmit = form.title.trim() && form.description.trim();

  return (
    <section className="panel">
      <h2>{isEditing ? "Edit task" : "Add task"}</h2>
      <form className="task-form" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={onFormChange}
            placeholder="Enter a title"
          />
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={onFormChange}
            placeholder="Describe the task"
            rows={3}
          />
        </div>

        {isEditing && (
          <div className="field checkbox-field">
            <label>
              <input
                type="checkbox"
                name="completed"
                checked={form.completed}
                onChange={onFormChange}
              />
              <span>Completed</span>
            </label>
            <span className="field-helper">
              Update the completion status of the task.
            </span>
          </div>
        )}

        <div className="actions">
          <button
            type="submit"
            disabled={loading || (!isEditing && !canSubmit)}
          >
            {isEditing ? "Update" : "Create task"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default TaskForm;
