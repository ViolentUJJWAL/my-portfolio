import api from './api'; // Axios instance for base URL and interceptors
import { toast } from 'react-toastify';

// Toast helper for promises
const toastPromise = (promise, messages) => {
  return toast.promise(promise, {
    pending: messages.pending,
    success: messages.success,
    error: messages.error,
  });
};

// User service
const userService = {
  getUser: async () => {
    const getUserPromise = api.get('/users');
    return toastPromise(getUserPromise, {
      pending: 'Fetching user data...',
      success: 'User data fetched successfully!',
      error: 'Failed to fetch user data!',
    }).then(response => response.data);
  },

  updateUser: async (userData) => {
    const updateUserPromise = api.put('/users', userData);
    return toastPromise(updateUserPromise, {
      pending: 'Updating user data...',
      success: 'User data updated successfully!',
      error: 'Failed to update user data!',
    }).then(response => response.data);
  },

  uploadFile: async (fileData, fileType) => {
    const endpoint = `/users/upload${fileType}`;
    const uploadFilePromise = api.put(endpoint, fileData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return toastPromise(uploadFilePromise, {
      pending: `Uploading ${fileType}...`,
      success: `${fileType} uploaded successfully!`,
      error: `Failed to upload ${fileType}!`,
    }).then(response => response.data);
  },

  resetPassword: async (passwordData) => {
    const resetPasswordPromise = api.put('/users/resetPassword', passwordData);
    return toastPromise(resetPasswordPromise, {
      pending: 'Resetting password...',
      success: 'Password reset successfully!',
      error: 'Failed to reset password!',
    }).then(response => response.data);
  },

  addLink: async (linkData) => {
    const addLinkPromise = api.put('/users/addLink', linkData);
    return toastPromise(addLinkPromise, {
      pending: 'Adding link...',
      success: 'Link added successfully!',
      error: 'Failed to add link!',
    }).then(response => response.data);
  },

  deleteLink: async (id) => {
    const deleteLinkPromise = api.delete(`/users/deleteLink/${id}`);
    return toastPromise(deleteLinkPromise, {
      pending: 'Deleting link...',
      success: 'Link deleted successfully!',
      error: 'Failed to delete link!',
    }).then(response => response.data);
  },

  getUserProfile: async (username) => {
    const getUserProfilePromise = api.get(`/users/${username}`);
    return toastPromise(getUserProfilePromise, {
      pending: `Fetching profile for ${username}...`,
      success: `Profile for ${username} fetched successfully!`,
      error: `Failed to fetch profile for ${username}!`,
    }).then(response => response.data);
  },
};

export default userService;
