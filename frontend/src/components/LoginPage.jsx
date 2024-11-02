// src/components/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import "../assets/styles/loginPage/styles.css";
import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import Loading from './Loading';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { activeTheme, activeBg } = useTheme()// Default theme

  useEffect(() => {
    // Apply active theme to the root element
    const root = document.getElementById("lodin-page");
    root.style.setProperty("--background", activeTheme.background);
    root.style.setProperty("--text", activeBg.color);
    if(!loading){
      document.getElementById("submit-btn").style.setProperty("--color", activeTheme.color);
    }
    root.style.setProperty("--primary-color", activeTheme.background);
  }, [activeTheme, activeBg]); // Re-run effect whenever activeTheme changes

  const handleLogin = () => {
    if (username && password) {
      login('mockToken'); // Replace with actual API call for login
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="login-page" id="lodin-page">
      {
        (loading) ? <Loading /> : ""
      }
          <section className="container">
            <div className="login-container">
              <div className="circle circle-one"></div>
              <div className="form-container">
                <img
                  src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
                  alt="illustration"
                  className="illustration"
                />
                <h1 className="opacity">LOGIN</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="USERNAME OR EMAIL"
                    minLength={2}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    minLength={6}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit" id='submit-btn' className="opacity" onClick={handleLogin}>
                    SUBMIT
                  </button>
                </form>
                <div className="register-forget opacity" style={{ color: "black" }}>
                  <Link to="/signup" >REGISTER</Link>
                  <Link to="">FORGOT PASSWORD</Link>
                </div>
              </div>
              <div className="circle circle-two"></div>
            </div>
          </section>
    </div>
  );
};

export default LoginPage;
