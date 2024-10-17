import React, { useState } from "react";

function generateId() {
  return Math.floor(Math.random() * 1000000).toString();
}

export const Component = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: generateId(), text: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditingTaskId(taskId);
      setNewTask(taskToEdit.text);
    }
  };

  const handleSaveEdit = () => {
    if (newTask.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: newTask } : task
        )
      );
      setEditingTaskId(null);
      setNewTask("");
    }
  };

  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </>
              
            ) : (
              <span onClick={() => toggleTask(task.id)}>{task.text}</span>
            )}
            <button onClick={() => removeTask(task.id)}>Remove</button>
            <button onClick={() => handleEditTask(task.id)}>Edit</button>
            <button onClick={handleSaveEdit}>Save</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Component;
