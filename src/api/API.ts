import axios from "axios";

export const API = axios.create({
    baseURL: "https://pot-cake-backend.vercel.app/api",  
})