function createTask(title, description) {
  return {
    id: Date.now(),
    title: title.trim(),
    description: description.trim(),
    completed: false,
  };
}

export default createTask;
