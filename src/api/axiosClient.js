import axios from "axios";

const axiosClient = axios.create({
  //baseURL: "http://localhost:5003",
  baseURL: "https://k-shop-bend.vercel.app",
});

// 🔥 Automatically attach token with every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ADD TOKEN HERE
  }

  return config;
});

export default axiosClient;
