// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './components/ThemeContext';
import LogoutButton from './components/LogoutButton';
import ThemeBtn from './components/ThemeBtns';
import ConactUsPage from './components/ConactUsPage';
import ThemeBgBtn from './components/ThemeBgBtn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import Forms from './components/Forms';

const LogInUserRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};
const UnLoginUserRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <AuthProvider>
        <ThemeProvider>
          <Navbar />
          <LogoutButton />
          <ThemeBtn />
          <ThemeBgBtn />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={
              <UnLoginUserRoute>
                <LoginPage />
              </UnLoginUserRoute>
              } />
            <Route path="/signup" element={
              <UnLoginUserRoute>
                <SignupPage />
              </UnLoginUserRoute>
              } />
            <Route path="/contactus" element={<ConactUsPage />} />
            <Route
              path="/dashboard"
              element={
                <LogInUserRoute>
                  <Dashboard />
                </LogInUserRoute>
              }
            />
            <Route
              path="/add-data"
              element={
                <LogInUserRoute>
                  <Forms />
                </LogInUserRoute>
              }
            />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
