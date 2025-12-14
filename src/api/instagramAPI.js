import axios from "axios";

const instagramAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ SEND TOKEN WITH EVERY REQUEST
instagramAPI.interceptors.request.use((config) => {
  const data = localStorage.getItem("user");
  if (data) {
    const parsed = JSON.parse(data);
    config.headers.Authorization = `Bearer ${parsed.token}`;
  }
  return config;
});

export default instagramAPI;



