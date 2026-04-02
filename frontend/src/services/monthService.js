import { axiosInstance } from "@/lib/axios";

const monthService = {
    getMonths() {
        return axiosInstance.get();
    },
};

export default monthService;