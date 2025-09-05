// src/api/authService.js
import API from "./apiClient";
import { setAccessToken, getAccessToken, clearAccessToken } from "./tokenStorage";

// --- Login ---
export const loginUser = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  if (res.data.accessToken) {
    setAccessToken(res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }
  return res.data;
};

// --- Refresh token (uses HttpOnly cookie on server) ---
export const refreshToken = async () => {
  const res = await API.post("/auth/refresh");
  if (res.data.accessToken) {
    setAccessToken(res.data.accessToken);
    return res.data.accessToken;
  }
  throw new Error("No access token returned");
};

// --- Register ---
export const registerUser = async (userData) => {
  const res = await API.post("/auth/signup", userData);
  if (res.data.accessToken) {
    setAccessToken(res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }
  return res.data;
};

// --- Get access token ---
export const getToken = () => getAccessToken();

// --- Logout ---
export const logout = async () => {
  await API.post("/auth/logout"); // backend clears refresh cookie + DB
  clearAccessToken();
  localStorage.removeItem("user");
};

// --- Get current user from localStorage ---
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
