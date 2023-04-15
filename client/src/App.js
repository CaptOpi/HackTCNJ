import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import Login from './components/Login'
//import TaskPlanner from './components/TaskPlanner'
import Signup from './components/Signup'
//import Dashboard from './components/Dashboard'
//import { useState, useEffect} from 'react'
//import {createUser} from'./api'

function App() {
  return (
    <div className="App">
      <Signup/>
    </div>
  );
}

export default App;
