import axios, { AxiosInstance } from "axios";
import { HttpError, HttpMethod, LoginRequest, RegisterRequest, User } from "./types";

const apiClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    validateStatus: function (_) {
        return true;
      },
})
apiClient.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else config.headers.Authorization = null;
      return config;
    },
    (error: unknown) => {
      return Promise.reject(new HttpError(500, (error as Error).message));
    }
  );
export default apiClient
export  async function logout() {
    await localStorage.deleteItemAsync("jwtToken");
    window.location.href = "/landing"
}
export async function apiFetch<T>(
    endpoint: string,
    method: HttpMethod = "GET",
    requiresAuth: boolean = true,
    body?: Record<string, any>
  ): Promise<{data: T, status: number} | null> {
    try {
      const config = {
        method,
        url: endpoint,
        data: body || undefined,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            requiresAuth &&
            `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      };
  
      const res = await apiClient.request<T>(config);
      if (res.status === 403 && requiresAuth) {
        await logout();
      }
      return { data: res.data, status: res.status };
    } catch (error: unknown) {
      return null;
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
            return res.data.token
        }
        return null
    } catch(error: unknown) {
        throw new HttpError(500)
    }
}
export async function apiRegister(request: RegisterRequest) {
    const res = await apiClient.post("auth/register", request)
    if (res) {
        return res.data.token
    }
}