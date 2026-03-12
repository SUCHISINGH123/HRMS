import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-backend-i11k.onrender.com/api/",
});

export default api;
