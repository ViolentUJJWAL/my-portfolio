import api from './api'; // Axios instance
import { toast } from 'react-toastify';

// Toast configuration for promises
const toastPromise = (promise, messages) => {
  return toast.promise(promise, {
    pending: messages.pending,
    success: messages.success,
    error: messages.error,
  });
};

// User service
const authService = {
  signup: async (userData) => {
    const signupPromise = api.post('/auth/signup', userData);
    try {
      const response = await toastPromise(signupPromise, {
        pending: 'Creating your account...',
        success: 'Signup successful!',
        error: 'Signup failed!',
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || 'Signup failed!';
      throw new Error(message);
    }
  },

  login: async (credentials) => {
    const loginPromise = api.post('/auth/login', credentials);
    try {
      const response = await toastPromise(loginPromise, {
        pending: 'Logging you in...',
        success: 'Login successful!',
        error: 'Login failed! Please check your credentials.',
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed!';
      throw new Error(message);
    }
  },

  logout: async () => {
    const logoutPromise = api.get('/auth/logout');
    try {
      const response = await toastPromise(logoutPromise, {
        pending: 'Logging you out...',
        success: 'Logout successful!',
        error: 'Logout failed!',
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || 'Logout failed!';
      throw new Error(message);
    }
  },
};

export default authService;
