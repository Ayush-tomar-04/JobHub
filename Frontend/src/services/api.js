
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "";

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
