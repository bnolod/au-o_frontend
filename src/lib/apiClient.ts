import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { HttpError, HttpMethod, LoginRequest, User } from "./types";

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",     
    }
})
apiClient.interceptors.request.use(
    async (config) => {
        const token = await localStorage.getItem("token") //remélem nem localstorage megoldás lesz
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } else config.headers.Authorization = null
        return config
    }
)
export default apiClient

export async function apiFetch<T>(endpoint: string, method: HttpMethod = "GET", requiresAuth: boolean = true, body?: Record<string, any>): Promise<T | null> {
    try {
        const config: AxiosRequestConfig = {
            method,
            url: endpoint,
            data: body || undefined,
            headers: {
                "Content-Type": "application/json",
                
            },
            withCredentials: requiresAuth
        }

        const res = await apiClient.request<T>(config)
        return res.data
    } catch(error: unknown) {
        throw new HttpError(500)
        
    }
}
export async function getUserByToken(token: string): Promise<User | null> {
    try {
        const res = await apiClient.post("auth/profile", token)
        if (res) {
            
            return res.data
        }
        return null
    } catch(error: unknown) {
        throw new HttpError(500)
    }
}
export async function apiLogin(request: LoginRequest): Promise<string | null> {
    try {
        const res = await apiClient.post("auth/login", request)
        if (res) {
            return res.data
        }
        return null
    } catch(error: unknown) {
        throw new HttpError(500)
    }
}