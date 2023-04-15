import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import TaskPlanner from './components/TaskPlanner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path = "/Signup" element = {<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path = "/TaskPlanner" element={<TaskPlanner />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;