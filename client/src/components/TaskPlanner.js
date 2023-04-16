import React, { useState } from 'react';
import { addTask, completeAnimal, completeGoal, completeTask, updateGoal, wipeTasks } from '../api';
import { getEmail, getPass} from './auth'
function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState(0);
  const [goal, setGoal] = useState('');
  const [showGoalInput, setShowGoalInput] = useState(true);
  const [goalSubmitted, setGoalSubmitted] = useState(false);

  const handleAddTask = async () => {
    if (newTask !== '') {
      setTasks([...tasks, { name: newTask, completed: false }]);
      setNewTask('');
      const response = await addTask(getEmail(), getPass(), newTask);
      if(!(response.status === 200)) {
        console.error(response)
      }
    }
  };

  const handleTaskComplete = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
    setCompletedTasks(completedTasks + 1);
    const response = await completeTask(getEmail(),getPass(), updatedTasks[index].name);
    if(!(response.status === 200)) {
      console.error(response)
    } 
  };

  const handleResetList = async () => {
    setTasks([]);
    setCompletedTasks(0);
    setGoal('');
    setShowGoalInput(true);
    setGoalSubmitted(false);
    const response = await wipeTasks(getEmail(),getPass());
    if(!(response.status === 200)) {
      console.error(response)
    }
    const responseSecond = await completeGoal(getEmail(),getPass(),goal);
    if(!(responseSecond.status === 200)) {
      console.error(responseSecond)
    }
    const responseThird = await completeAnimal(getEmail(),getPass());
    if (!(responseThird.status === 200)) {
      console.error(responseThird);
    }
  }
  const handleGoalSubmit = async (event) => {
    event.preventDefault();
    setShowGoalInput(false);
    setGoalSubmitted(true);
    const response = await updateGoal(getEmail(),getPass(),goal);
    if(!(response.status === 200)) {
      console.error(response)
    } 
  }

  const imageMap = {
    eggunhatched1: '/unhatchedegg-removebg-preview.png',
    eggunhatched: '/unhatchedegg-removebg-preview.png',
    eggmidhatch: '/midhatchegg-removebg-preview.png',
    eggmidhatch2: '/midhatchegg-removebg-preview.png',
    eggnearhatch: '/nearhatchicon-removebg-preview.png',
    brown: '/brownchar-removebg-preview.png',
    yellow: '/yellowchar-removebg-preview.png',
    blue: '/bluechar-removebg-preview.png',
    white: '/whitechar-removebg-preview.png'
  };
  
  const renderImages = (completedTasks, completeGoal) => {
    const totalCompleted = completedTasks + completeGoal.length;
  
    switch (completedTasks) {
      case 0:
        return <img src={imageMap['eggunhatched']} alt="eggunhatched" />;
      case 1:
        return <img src={imageMap['eggunhatched']} alt="eggunhatched" />;
      case 2:
        return <img src={imageMap['eggmidhatch']} alt="eggmidhatch" />;
      case 3:
        return <img src={imageMap['eggmidhatch']} alt="eggmidhatch" />;
      case 4:
        return <img src={imageMap['eggnearhatch']} alt="eggnearhatch" />;
      default:
        break;
    }
  
    switch (totalCompleted) {
      case 5:
        return <img src={imageMap['brown']} alt="brown" />;
      case 6:
        return <img src={imageMap['yellow']} alt="yellow" />;
      case 7:
        return <img src={imageMap['blue']} alt="blue" />;
      case 8:
        return <img src={imageMap['white']} alt="white" />;
      default:
        return null;
    }
  };
  

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
      {renderImages(completedTasks)}
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
