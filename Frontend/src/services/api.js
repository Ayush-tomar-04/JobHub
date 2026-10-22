
import axios from "axios";

axios.interceptors.request.use(
    (config) => {
        const url = config.url || "";

        const isEmployerRequest =
            url.includes("/employer/") ||
            url.includes("/api/v1/deleteJob/") ||
            (url === "/api/v1/jobs" && (config.method || "").toLowerCase() === "post") ||  url.includes("/api/v1/updateJob/") ||
            url.includes("/api/v1/applications/")

        const token = isEmployerRequest
            ? localStorage.getItem("EmployerToken")
            : localStorage.getItem("token");
console.log("Save Job Auth Debug:", {
    url,
    method: config.method,
    isEmployerRequest,
    userTokenExists: !!localStorage.getItem("token"),
    employerTokenExists: !!localStorage.getItem("EmployerToken"),
    selectedTokenExists: !!token
});
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
