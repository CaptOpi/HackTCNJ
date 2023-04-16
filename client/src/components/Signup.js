import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser, initializeAnimals, twilio} from '../api';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const nav = useNavigate();
  const resets = sessionStorage.setItem('resets', 0)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    try {
      const user = { name, email, password };
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', password);
      const contents = {
        contents: `Hello! Thank you for signing up at HatchHabits!`,
        mediaUrl: 'https://media.tenor.com/nu9XqB4pQGsAAAAi/line-sticker-thank-you-sticker.gif'
      }
      const response = await createUser(user);
      if (response.status===200)
      {
        const response2 = await initializeAnimals(email,password);
        if(!(response2.status)===200) {
          console.error(response2);
        }
        const response3 = twilio(contents);
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
