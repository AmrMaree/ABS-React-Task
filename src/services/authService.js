import api from "./api";

export const authService = {
  login(credentials) {
    console.log("Sending login request", credentials);

    return api
      .post("/auth/login", credentials)
      .then((res) => {
        console.log("Login API success:", res.data);
        return res;
      })
      .catch((err) => {
        console.log("Login API error:", err.response?.data);
        throw err;
      });
  },
  register: (data) => api.post("/auth/register", data),
  resetCode: (data) => api.patch("/auth/reset-code", data),
  resetPassword: (data) => api.patch("/auth/reset-password", data),
  logout: () => api.get("/auth/logout"),
};
