// src/components/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const themes = [
        {
            background: "#1A1A2E",
            color: "#FFFFFF",
        },
        {
            background: "#461220",
            color: "#FFFFFF",
        },
        {
            background: "#192A51",
            color: "#FFFFFF",
        },
        {
            background: "#F7B267",
            color: "#000000",
        },
        {
            background: "#F25F5C",
            color: "#000000",
        },
        {
            background: "#231F20",
            color: "#FFFFFF",
        },
        {
            background: "#36c8f556",
            color: "#000000",
        },
        {
            background: "#30f751",
            color: "#000000",
        },
        {
            background: "#f83939",
            color: "#000000",
        },
    ];

    const bgTheme = [
      {
        url: "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg",
        color: "#000000"
      },
      {
        url: "https://img.goodfon.com/original/1367x651/1/c0/zheleznaya-doroga-fon-priroda-322.jpg",
        color: "#000000"
      },
      {
        url: "https://wallpapers.com/images/high/white-color-vignette-oxy80lfx3c8ir1yc.webp",
        color: "#000000"
      },
      {
        url: "https://images8.alphacoders.com/132/1325725.png",
        color: "#ffffff"
      },
      {
        url: "https://undsgn.com/wp-content/uploads/2018/04/ltotbngnzzu-uai-1350x759.jpg",
        color: "#ffffff"
      },
      {
        url: "https://www.solidbackgrounds.com/images/950x350/950x350-black-solid-color-background.jpg",
        color: "#ffffff"
      },
    ]
    
  const [activeTheme, setActiveTheme] = useState(themes[0]);
  const [activeBg, setActiveBg] = useState(bgTheme[0]);

  const changeTheme = (theme) => {
    setActiveTheme(theme);
  };

  const changeBg = (bgTheme) => {
    setActiveBg(bgTheme);
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, changeTheme, themes, activeBg, changeBg, bgTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
