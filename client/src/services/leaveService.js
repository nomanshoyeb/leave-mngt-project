import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = `${BASE_URL}/leaves`;
const ADMIN_API = `${BASE_URL}/admin`;
// Apply leave
export const applyLeave = (data, token) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
// Get my leaves
export const getMyLeaves = (token) =>
  axios.get(`${API}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
// Get all leaves by Admin
export const getAllLeaves = (token) =>
  axios.get(`${ADMIN_API}/leaves`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
// Update leave status by Admin
export const updateLeaveStatus = (id, status, token) =>
  axios.put(
    `${ADMIN_API}/leaves/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const getLeaveBalance = (token) =>
  axios.get(`${API}/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });