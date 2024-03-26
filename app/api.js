// api.js

import axios from 'axios';

// const BASE_URL = 'https://your-api-base-url.com'; // Change this to your API base URL
const BASE_URL="https://api.mirar.ai/api/v1"

const API_KEY="42bef730-7a95-475e-990f-ec4e3d450b24"

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    "x-api-key":API_KEY
  },
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};


// Define your API endpoints as methods of this object
const API = {
  // Example method for making a GET request
  getExampleData: async (params) => {
    try {
      const response = await api.get('/example-endpoint', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  //POST API for all 
  postAPICalling:async(endPoint,data,token)=>{
    setAuthToken(token);
    try {
        const response=await api.post(endPoint,data);
        return response.data;
        
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
  },

  //Get API for all 
  getAPICalling:async(endPoint,token)=>{
    setAuthToken(token);
    try {
      const response=await api.get(endPoint);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  // Example method for making a POST request
  postExampleData: async (data) => {
    try {
      const response = await api.post('/example-endpoint', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  // Add more methods for other API endpoints as needed
};

export default API;