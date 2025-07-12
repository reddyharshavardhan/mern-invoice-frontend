import axios from "axios";
const API = axios.create({
  baseURL: "https://mern-invoice-backend-production.up.railway.app/api",
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default API;
