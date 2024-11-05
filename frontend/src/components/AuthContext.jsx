// src/components/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState("")
  const [skillData, setSkillData] = useState([])
  const [educationData, setEducationData] = useState([])
  const [experienceData, setExperienceData] = useState([])
  const [projectData, setProjectData] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const navigate = useNavigate();


  const login = (data) => {
    console.log("userdata", data.data)
    setUserData(data.data);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const setAllData = (data) =>{
    setSkillData(data.skill)
    setEducationData(data.education)
    setExperienceData(data.experience)
    setProjectData(data.project)
  }

  const setUser = (data) =>{
    setUserData(data)
    isAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.clear()
    setIsAuthenticated(false);
    setUserData("");
    navigate('/login');
  };

  useEffect(()=>{
    const token = document.cookie.split("=")
    if(token[0]==="token"){
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userData, setUser, setAllData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
