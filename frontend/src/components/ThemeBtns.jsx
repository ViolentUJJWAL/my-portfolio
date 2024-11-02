// src/components/Navbar.jsx
import React, { useEffect } from 'react';
import { useTheme } from './ThemeContext';

import "../assets/styles/themeBtn/style.css"

const ThemeBtn = () => {
    const { activeTheme,themes, changeTheme } = useTheme();

    useEffect(() => {
        // Apply active theme to the root element
        console.log(activeTheme)
    }, [activeTheme]);

    return (
        <div className="theme-btn-container">
            {themes.map((theme, index) => (
                <div
                    key={index}
                    className="theme-btn"
                    style={{
                        background: theme.background,
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                        margin: "5px"
                    }}
                    onClick={() => changeTheme(theme)}
                />
            ))}
        </div>
    );
};

export default ThemeBtn;
