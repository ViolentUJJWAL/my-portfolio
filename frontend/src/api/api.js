// src/api/api.js
import axios from 'axios';
import { toast } from 'react-toastify';


const API_BASE_URL = "http://localhost:3000/api";


// Example function for GET request
export const getApi = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
        withCredentials: true, // Ensures cookies are included in requests
      });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    if(error.status === 500){
      toast.error("Internal server error, try again")
    }else{
      toast.error(error.response.data.error)
    }
    throw error;
  }
};

// Example function for POST request
export const postApi = async (endpoint, data) => {
  try {
    console.log(data)
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
        withCredentials: true, // Ensures cookies are included in requests
      });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    if(error.status === 500){
      toast.error("Internal server error, try again")
    }else{
      toast.error(error.response.data.error)
    }
    throw error;
  }
};

export const putApi = async (endpoint, data) => {
  try {
    console.log(data)
    const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, {
        withCredentials: true, // Ensures cookies are included in requests
      });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    if(error.status === 500){
      toast.error("Internal server error, try again")
    }else{
      toast.error(error.response.data.error)
    }
    throw error;
  }
};

export const deleteApi = async (endpoint) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${endpoint}`, {
        withCredentials: true, // Ensures cookies are included in requests
      });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    if(error.status === 500){
      toast.error("Internal server error, try again")
    }else{
      toast.error(error.response.data.error)
    }
    throw error;
  }
};
