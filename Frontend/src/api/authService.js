import API from "./apiClient";
import { setAccessToken, clearAccessToken } from "./tokenStorage";

// --- Login ---
export const loginUser = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  if (res.data.accessToken) {
    setAccessToken(res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }
  return res.data;
};

// --- Refresh token ---
export const refreshToken = async () => {
  const res = await API.post("/auth/refresh"); // cookie sent automatically
  const token = res.data.accessToken; // ✅ backend sends { accessToken }
  if (token) {
    setAccessToken(token);
    return token;
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

// --- Logout ---
export const logout = async () => {
  await API.post("/auth/logout");
  clearAccessToken();
  localStorage.removeItem("user");
};

// --- Get current user from localStorage ---
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
