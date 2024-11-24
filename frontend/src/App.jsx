import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './components/ThemeContext';
import ConactUsPage from './components/ConactUsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Forms from './components/Forms';
import Layout from './components/Layout/Layout';

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
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/login"
              element={
                <UnLoginUserRoute>
                  <Layout>
                    <LoginPage />
                  </Layout>
                </UnLoginUserRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <UnLoginUserRoute>
                  <Layout>
                    <SignupPage />
                  </Layout>
                </UnLoginUserRoute>
              }
            />
            <Route path="/contactus" element={<Layout><ConactUsPage /></Layout>} />
            <Route
              path="/dashboard"
              element={
                <LogInUserRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </LogInUserRoute>
              }
            />
            <Route
              path="/add-data"
              element={
                <LogInUserRoute>
                  <Layout>
                    <Forms />
                  </Layout>
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