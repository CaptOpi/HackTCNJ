import React, { useState } from 'react';
import { addTask, completeAnimal, completeGoal, completeTask, updateGoal, wipeTasks} from '../api';
import { getEmail, getPass} from './auth'
import './Signup.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState(0);
  const [goal, setGoal] = useState('');
  const [showGoalInput, setShowGoalInput] = useState(true);
  const [goalSubmitted, setGoalSubmitted] = useState(false);
  const [resetvalue, setResetValue]= useState(0);
  var totalCompleted = 0

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
    setResetValue(resetvalue+1);
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

  const renderImages = (completedTasks, completeGoal)=>{
    totalCompleted = completedTasks + resetvalue;
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
      <a href="/Login" id="logout-btn">Logout</a>
      <a href="/Dashboard" id="db-btn">Dashboard</a>
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
            {renderImages(completedTasks,resetvalue)}
      {goalSubmitted && (
         <>
         <div className="checkbox-container2">
          <ul>
            <li>
           <h2>Get Better at Math</h2> 
              <label>
                <input type="checkbox" className="checkbox-input2" defaultChecked={true} />
                <span className="checkbox-label">Read 3 Chapters from textbook</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="checkbox-input2" />
                <span className="checkbox-label">Do 50 exercise problems</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="checkbox-input2" />
                <span className="checkbox-label">Attend 3 office hours</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="checkbox-input2" defaultChecked={true} />
                <span className="checkbox-label">Finish all homework on time</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="checkbox-input2" />
                <span className="checkbox-label">Watch 5 khan Academy videos</span>
              </label>
            </li>
          </ul></div><div className="checkbox-container">
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={task.completed}
                    onChange={() => handleTaskComplete(index)}
                    disabled={task.completed} />
                  {task.name}
                </li>
              ))}
            </ul>
            <div className="add-task-container">

              <input
                type="text"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)} />
              <button className="add-task-button" onClick={handleAddTask} disabled={tasks.length >= 5}>Add Task</button>
              {completedTasks >= 5 && <button class="add-task-button" onClick={handleResetList}>Reset List</button>}
            </div>
          </div></>
      )}
    </div>
  );
}

export default ToDoList;
