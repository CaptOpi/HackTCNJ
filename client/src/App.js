import './App.css';
import TaskPlanner from './components/TaskPlanner'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect} from 'react'
import {createUser} from'./api'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element={<Login/>}/>
          <Route path = "/signup" element={<Signup/>}/>
          <Route path = "/taskplanner" element={<TaskPlanner/>}/>
          <Route path = "/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
