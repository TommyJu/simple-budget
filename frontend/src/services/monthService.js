import { axiosInstance } from "@/lib/axios";

const monthService = {
    createMonth(data) {
        return axiosInstance.post("/month/create-month", data);
    },
    getMonthOverviews() {
        return axiosInstance.get("/month/get-month-overviews");
    },
    getMonthDetails(monthId) {
        return axiosInstance.get("/month/get-month-details", {params: monthId});
    },
    deleteMonth(monthId) {
        return axiosInstance.delete("/month/delete-month", {params: monthId});
    },
    editMonth(data) {
        return axiosInstance.put("/month/edit-month", data);
    }
};

export default monthService;