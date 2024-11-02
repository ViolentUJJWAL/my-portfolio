// components/LogoutButton.js
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import "../assets/styles/logoutBtn/style.css"


const LogoutButton = () => {
  const { logout } = useAuth();
  const { activeTheme, activeBg } = useTheme()

  const style = {
    "position": "absolute",
    "top": 0,
    "right": 0,
    "padding": "40px"
  }

  useEffect(() => {
    // Apply active theme to the root element
    console.log(activeTheme)
    const root = document.getElementsByClassName("logoutBtn")[0];
    console.log(root)
    root.style.setProperty("--bgColor", activeTheme.background);
    root.style.setProperty("--textHoverColor", activeTheme.color);
    root.style.setProperty("--color", activeBg.color);
  }, [activeTheme,activeBg]);

  // <button onClick={logout}>Logout</button>
  return (
    <div className='logoutBtn' style={style}>
      <button className="button" onClick={logout}>
        LOG OUT
      </button>
    </div>
  );
};

export default LogoutButton;
