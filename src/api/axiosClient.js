import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://k-shop-bend.vercel.app",
 // baseURL: "http://localhost:5003",

});

export default axiosClient;
