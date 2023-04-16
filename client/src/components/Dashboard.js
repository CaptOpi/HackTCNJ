import React, { useState, useEffect } from 'react';
import { getEmail, getPass} from './auth'
import { getCompletedGoals,getCompletedAnimals} from '../api'
import './Dashboard.css';

function Dashboard() {
  const [completedGoals, setCompletedGoals] = useState([]);
  const [completedAnimals, setCompletedAnimals] = useState([]);
  useEffect(() => {
    async function fetchCompletedData() {
      try {
        const email = getEmail();
        const password = getPass();
        const data = await getCompletedGoals(email, password);
        const animals = await getCompletedAnimals(email, password);
        setCompletedGoals(data.data);
        setCompletedAnimals(animals.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCompletedData();
  }, []);
  return (
    <><a href="/Login" id="logout-btn">Logout</a><a href="/TaskPlanner" id="db-btn">Task Planner</a><div className="dashboard-container">
          <div className="completed-animals-container">
              <div className="completed-animals-grid">
                  {completedAnimals.map((animal) => (
                      <div key={animal._id} className="completed-animal">
                          <img
                              src={`${animal.name}char-removebg-preview.png`}
                              className="completed-animal-image"
                              alt=""
                              width="100"
                              height="100" />
                          <div className="completed-animal-name" style={{ backgroundColor: completedAnimals.includes(animal.name) ? 'light-red' : '#ADFF2F' }}>{animal.name}</div>
                      </div>
                  ))}
              </div>
          </div>
          <div className="completed-goals-container">
              <h2 className="completed-goals-header">Completed Goals</h2>
              <ul className="completed-goals-list">
                  {completedGoals.map((goal) => (
                      <li key={goal._id} className="completed-goals-list-item">
                          {goal.title}
                      </li>
                  ))}
              </ul>
          </div>
      </div></>
  );
}

export default Dashboard;
