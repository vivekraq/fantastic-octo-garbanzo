import axios from "axios";

// Configure axios to send cookies with requests for authentication
const api = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true, // This is crucial for sending cookies with requests
});

// Add request interceptor to handle authentication
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // User is not authenticated, redirect to login
      console.log("Authentication required, redirecting to login...");
      window.location.href = "http://localhost:3000/login";
    }
    return Promise.reject(error);
  }
);

export default api;
