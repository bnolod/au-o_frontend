import axios, { AxiosInstance } from "axios";
import {
  HttpError,
  HttpMethod,
  LoginRequest,
  RegisterRequest,
  User,
} from "./types";

/**
 * Axios instance configured for API requests.
 *
 * This instance is configured with a base URL, default headers, and a request interceptor
 * that adds the JWT token from localStorage to the Authorization header of each request.
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  validateStatus: function (_) {
    return true;
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.Authorization = null;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(new HttpError(500, (error as Error).message));
  }
);

export default apiClient;

/**
 * Logs out the user.
 *
 * This function removes the JWT token from localStorage and redirects the user to the landing page.
 *
 * @returns {Promise<void>} - A promise that resolves when the logout process is complete.
 *
 * @example
 * logout().then(() => {
 *   console.log("User logged out");
 * });
 */
export async function logout(): Promise<void> {
  await localStorage.removeItem("jwtToken");
  window.location.href = "/landing";
}

export async function apiFetch<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  requiresAuth: boolean = true,
  body?: Record<string, any>
): Promise<{ data: T; status: number } | null> {
  try {
    const config = {
      method,
      url: endpoint,
      data: body || undefined,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          requiresAuth && `Bearer ${window.localStorage.getItem("jwtToken")}`,
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
/**
 * apiFetch handles token automatically from localstorage
 */
export async function getUserByToken(): Promise<User | null> {
  try {
    const res = await apiFetch("auth/profile");
    if (res) {
      return res.data as User;
    }
    return null;
  } catch (error: unknown) {
    throw new HttpError(500, "getuserbytoken_fail + " + error);
  }
}
export async function apiLogin(request: LoginRequest): Promise<string | null> {
  try {
    const res = await apiClient.post("auth/login", request);
    if (res) {
      console.info("login completed");
      return res.data.token;
    }
    return null;
  } catch (error: unknown) {
    throw new HttpError(500, "apilogin_fail " + error);
  }
}
export async function apiRegister(request: RegisterRequest) {
  const res = await apiClient.post("auth/register", request);
  if (res) {
    console.info("register completed");
    return res.data.token;
  }
}
