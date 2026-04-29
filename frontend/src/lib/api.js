import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const submitFeedback = (payload) => api.post("/feedback", payload).then((r) => r.data);
export const joinWaitlist = (payload) => api.post("/waitlist", payload).then((r) => r.data);
export const getStats = () => api.get("/stats").then((r) => r.data);
