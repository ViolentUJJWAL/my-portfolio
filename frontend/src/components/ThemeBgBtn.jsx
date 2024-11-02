// src/components/Navbar.jsx
import React, { useEffect } from 'react';
import { useTheme } from './ThemeContext';

import "../assets/styles/themeBtn/style.css"

const ThemeBgBtn = () => {
    const { activeBg, changeBg, bgTheme } = useTheme();

    useEffect(() => {
        // Apply active theme to the root element
        console.log(activeBg)
    }, [activeBg]);

    const changeBgHandler = (bg)=>{
        changeBg(bg)
        console.log(bg)
        document.body.style.backgroundImage = `url(${bg.url})` 
        document.body.style.backgroundSize = `cover`
        document.body.style.backgroundPosition = `center top`
    }

    return ( 
        <div className="theme-bg-btn-container">
            {bgTheme.map((bg, index) => {
                return (
                <div className='bg-btm' key={index}>
                    <img src={bg.url}
                        className="bg-img"
                        onClick={() => changeBgHandler(bg)}
                    />
                </div>)
            })}
        </div>
    );
};

export default ThemeBgBtn;
