
import React, { useState } from 'react';

export const Component = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');


    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask('');
        }
    };


    const toggleTask = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };
    return (<div><div className="input-container">
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
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                    <span onClick={() => toggleTask(task.id)}>{task.text}</span>
                    \
                </li>
            ))}
        </ul>


    </div>)

};
export default Component;
