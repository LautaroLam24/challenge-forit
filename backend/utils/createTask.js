function createTask(title, description) {
  return {
    id: String(Date.now()),
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: new Date(),
  };
}

export default createTask;
