
import axios from "axios";

axios.interceptors.request.use(
    (config) => {
        const url = config.url || "";

        const isEmployerRequest =
            url.includes("/employer/") ||
            url.includes("/api/v1/deleteJob/") ||
            url.includes("/api/v1/jobs") || 
            url.includes("/api/v1/updateJob/") ||
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
