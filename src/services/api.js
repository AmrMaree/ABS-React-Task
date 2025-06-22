import axios from "axios";

const api = axios.create({
  baseURL: "https://note-book-iota.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token in API", token);

  if (token) {
    config.headers.token = token;
  }

  return config;
});

export default api;
