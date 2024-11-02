// components/LogoutButton.js
import React, { useEffect } from 'react';
import { useTheme } from './ThemeContext';
import "../assets/styles/loading/style.css"


const Loading = () => {

  const { activeTheme } = useTheme()

  useEffect(() => {
    // Apply active theme to the root element
    const root = document.getElementsByClassName("water")[0];
    console.log(root)
    root.style.setProperty("--color", activeTheme.background);
  }, [activeTheme]);

  // <button onClick={logout}>Logout</button>
  return (
    <div className='loading'>
        <div className="water"></div>
    </div>
  );
};

export default Loading;
