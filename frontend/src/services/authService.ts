import { axiosInstance } from "@/lib/axios";

const authService = {
  checkAuth() {
    return axiosInstance.get("/auth/check-auth");
  },

  signup(data) {
    return axiosInstance.post("/auth/signup", data);
  },

  login(data) {
    return axiosInstance.post("/auth/login", data);
  },

  logout() {
    return axiosInstance.post("/auth/logout");
  },
};

export default authService;
