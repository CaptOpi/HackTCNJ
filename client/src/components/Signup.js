import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../api';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const nav = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    try {
      const user = { name, email, password };
      const response = await createUser(user);
      if (response.status===200)
      {
        nav('/TaskPlanner');
      }
      console.log(response);
      // code to redirect the user to their dashboard goes here
    } catch (error) {
      // code to display an error message to the user goes here
    }
  };

  return (
    <div className="Signup">
    <h1>Sign Up</h1> 
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          className="form-control"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          className="form-control"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          className="form-control"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          className="form-control"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
      <div className="mt-3">
        Already have an account? <Link to="/Login">Log in</Link>
      </div>
    </form>
    </div>
  );
}

export default Signup;
