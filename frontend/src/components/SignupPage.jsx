// src/components/SignupPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/signuoPage/style.css";
import { useTheme } from '../components/ThemeContext';
import Loading from './Loading';
import { toast } from 'react-toastify';
import { postApi } from '../api/api';



const SignupPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const { activeTheme } = useTheme()// Default theme

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(password!==confirmPassword){
        toast.error("Password and Confirm password not match")
        throw new Error("Password and Confirm password not match")
      }
      const formData = { name, username, email, phoneno, password };
      const resdata = await postApi("/auth/signup", formData)
      console.log(resdata)
      setLoading(false)
      navigate('/login');
    } catch (error) {
      console.log(error)
      console.log(loading)
    } finally{
      setLoading(false)
    }
  };
  // Close modal on Escape key press
  useEffect(() => {
    // Apply active theme to the root element
    const root = document.getElementById("signup");
    root.style.setProperty("--before-background", activeTheme.background);
    document.getElementById("submit-btn").style.setProperty("color", activeTheme.color);
    root.style.setProperty("color", activeTheme.color);
  }, [activeTheme, loading]); // Re-run effect whenever activeTheme changes

  return (
    <div className="signup-page" id='signup-page'>
      {loading && <Loading />}
      <section className="container">
        <form className="signup" id='signup' onSubmit={handleSignup}>
          <h1 style={{"textAlign": "center"}}>Create A New Account</h1>
          <input type="text" minLength={2} placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
          <input type="text" minLength={2} placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          <input type="number" min={1000000000} placeholder="Phone no." value={phoneno} onChange={(e)=>setPhoneno(e.target.value)} required/>
          <input type="password" minLength={6} placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
          <input type="text" minLength={6} placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>
          <div className='btn-box'>
            <button id='submit-btn' type='submit'>Sign up</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignupPage;
