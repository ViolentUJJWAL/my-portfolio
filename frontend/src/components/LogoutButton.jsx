// components/LogoutButton.js
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import "../assets/styles/logoutBtn/style.css"
import authService from '../api/authServices';


const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth();
  const { activeTheme, activeBg } = useTheme()

  const style = {
    "position": "fixed",
    "top": 0,
    "right": 0,
    "padding": "40px"
  }

  useEffect(() => {
    // Apply active theme to the root element
    if(isAuthenticated){
      const root = document.getElementsByClassName("logoutBtn")[0];
      root.style.setProperty("--bgColor", activeTheme.background);
      root.style.setProperty("--textHoverColor", activeTheme.color);
      root.style.setProperty("--color", activeBg.color);
    }
  }, [activeTheme, activeBg, isAuthenticated]);

  const onLogoutHandle = async () => {
    try {
      await authService.logout()
      logout()
    } catch (error) {
      console.log(error)
    }
  }


  // <button onClick={logout}>Logout</button>
  return (
    <div>
      {isAuthenticated && (
        <div className='logoutBtn' style={style}>
          <button className="button" onClick={onLogoutHandle}>
            LOG OUT
          </button>
        </div>
      )}
    </div>
  )
};

export default LogoutButton;
