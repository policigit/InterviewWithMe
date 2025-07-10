import axios from "axios";
import {BASE_URL} from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers : {
        "Content-Type":"application/json",
        Accept: "application/json",
    },
});

//Request Interceptor

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`; // Fixed typo
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

// Response Interceptor

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        // Handle common errors globally
        if(error.response){
            // Handle authentication errors (401 Unauthorized)
            if(error.response.status === 401){
                // Clear token and redirect to login page
                localStorage.removeItem("token");
                window.location.href = "/";
            }else if(error.response.status === 500){
                console.error("Server error. Please try again later.");
            }
        }else if(error.code === "ECONNABORTED"){
            console.error("Request timeout. Please try again.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;