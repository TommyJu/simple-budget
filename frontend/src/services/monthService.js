import { axiosInstance } from "@/lib/axios";

const monthService = {
    createMonth(data) {
        return axiosInstance.post("/month/create-month", data);
    },
    getMonthOverviews() {
        return axiosInstance.get("/month/get-month-overviews");
    },
};

export default monthService;