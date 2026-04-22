import axios from "axios";

// use env variable
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
});

export const signup = (data) => API.post("/signup", data);
export const login = (data) => API.post("/login", data);
