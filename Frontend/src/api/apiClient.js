// src/api/apiClient.js
import axios from "axios";
import { refreshToken } from "./authService";
import { getAccessToken, setAccessToken, clearAccessToken } from "./tokenStorage";

const API = axios.create({
  baseURL: "http://localhost:8050/api", 
  withCredentials: true, 
});

// Attach access token before every request
API.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired tokens (401)
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop on /auth/refresh
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken(); // backend issues new access token
        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest); // retry original request
      } catch (err) {
        clearAccessToken();
        localStorage.removeItem("user");
        window.location.href = "/login"; // force re-login
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
