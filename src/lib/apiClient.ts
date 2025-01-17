import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpError, HttpMethod } from "./types";

const apiClient: AxiosInstance = axios.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/json"
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
                Authorization: requiresAuth && `Bearer ${"token"}`
            }
        }

        const res = await apiClient.request<T>(config)
        return res.data
    } catch(error: unknown) {
        throw new HttpError(500)
        
    }
}