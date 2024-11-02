// src/components/SignupPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/signuoPage/style.css";
import { useTheme } from '../components/ThemeContext';



const SignupPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { activeTheme } = useTheme()// Default theme

  const navigate = useNavigate();

  const handleSignup = () => {
    alert('Signup successful!');
    navigate('/login');
  };
  // Close modal on Escape key press
  useEffect(() => {
    // Apply active theme to the root element
    const root = document.getElementById("signup");
    console.log(root, activeTheme)
    root.style.setProperty("--before-background", activeTheme.background);
    document.getElementById("submit-btn").style.setProperty("color", activeTheme.color);
    root.style.setProperty("color", activeTheme.color);
  }, [activeTheme]); // Re-run effect whenever activeTheme changes

  return (
    <div className="signup-page" id='signup-page'>
      <section className="container">
        <form className="signup" id='signup'>
          <h1 style={{"textAlign": "center"}}>Create A New Account</h1>
          <input type="text" minLength={2} placeholder="Name" value={name} onChange={(e)=>setName(e.value)} required/>
          <input type="text" minLength={2} placeholder="Username" value={username} onChange={(e)=>setUsername(e.value)} required/>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.value)} required/>
          <input type="number" min={1000000000} placeholder="Phone no." value={phoneno} onChange={(e)=>setPhoneno(e.value)} required/>
          <input type="password" minLength={6} placeholder="Password" value={password} onChange={(e)=>setPassword(e.value)} required/>
          <input type="text" minLength={6} placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.value)} required/>
          <div className='btn-box'>
            <button id='submit-btn' type='submit'>Sign up</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignupPage;
