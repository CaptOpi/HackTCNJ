import React, { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState(0);
  const [goal, setGoal] = useState('');
  const [showGoalInput, setShowGoalInput] = useState(true);
  const [goalSubmitted, setGoalSubmitted] = useState(false);

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
    setGoal('');
    setShowGoalInput(true);
    setGoalSubmitted(false);
  }

  const handleGoalSubmit = (event) => {
    event.preventDefault();
    setShowGoalInput(false);
    setGoalSubmitted(true);
  }

  return (
    <div>
      {goalSubmitted && <h1>{goal}</h1>}
      {!goalSubmitted && (
        <form onSubmit={handleGoalSubmit}>
          {showGoalInput && (
            <div>
              <label>
                Enter your goal for today:
      <input
        type="text"
        value={goal}
        onChange={(event) => setGoal(event.target.value)}
      />
              </label>
              <button type="submit">Submit</button>
            </div>
          )}
        </form>
      )}
      {goalSubmitted && (
        <div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskComplete(index)}
                  disabled={task.completed}
                />
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
      )}
    </div>
  );
}

export default ToDoList;
