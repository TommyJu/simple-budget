import { axiosInstance } from "@/lib/axios";

const monthService = {
    createMonth() {
        return axiosInstance.post("/month/create-month", data);
    },
    getMonths() {
        return axiosInstance.get("/month/get-months");
    },
};

export default monthService;