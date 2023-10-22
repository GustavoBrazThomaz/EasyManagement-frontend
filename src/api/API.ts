import axios from "axios";

export const API = axios.create({
    baseURL: "https://easy-management-backend.vercel.app/api",  
})