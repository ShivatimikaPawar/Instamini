import axios from "axios";

const instagramAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

instagramAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default instagramAPI;



