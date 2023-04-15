import React, { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState(0);
  const [goal, setGoal] = useState('');

  const handleAddTask = () => {
    if (newTask !== '') {
      setTasks([...tasks, { name: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleTaskComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
    setCompletedTasks(completedTasks + 1);
  };

  const handleResetList = () => {
    setTasks([]);
    setCompletedTasks(0);
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={goal}
        onChange={(event) => setGoal(event.target.value)}
        placeholder="Enter your goal for today..."
      />
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input type="checkbox" checked={task.completed} onChange={() => handleTaskComplete(index)} />
            {task.name}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      />
      <button onClick={handleAddTask} disabled={tasks.length >= 5}>Add Task</button>
      {completedTasks >= 5 && <button onClick={handleResetList}>Reset List</button>}
    </div>
  );
}

export default ToDoList;
