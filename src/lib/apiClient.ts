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
  baseURL: `${window.location.protocol}//${window.location.hostname}:8080/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials:true,
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
      withCredentials:true,
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
 * Fetches the user profile using the JWT token.
 * 
 * @returns {Promise<User | null>} - The user profile if successful, otherwise null.
 * 
 * 
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

/**
 * Logs in the user.
 * 
 * @param {LoginRequest} request - The login request object containing username and password.
 * 
 * @returns {Promise<string | null>} - The JWT token if login is successful, otherwise null.
 * 
 * @example
 * const token = await apiLogin({ username: 'user', password: 'pass' });
 * 
 */

export async function apiLogin(request: LoginRequest): Promise<string | null> {
  try {
    localStorage.removeItem("jwtToken");
    const res = await apiClient.post("auth/login", request);
    console.log(res);
    if (res) {
      console.info("login completed");
      return res.data.token;
    }
    return null;
  } catch (error: unknown) {
    throw new HttpError(500, "apilogin_fail " + error);
  }
}

/**
 * Registers a new user.
 * 
 * @param {RegisterRequest} request - The registration request object containing user details.
 * 
 * @returns {Promise<string | null>} - The JWT token if registration is successful, otherwise null.
 * 
 */

export async function apiRegister(request: RegisterRequest) {
  const res = await apiClient.post("auth/register", request);
  if (res) {
    console.info("register completed");
    return res.data.token;
  }
}

/**
 * Adds or removes a reaction to a post, comment, or reply.
 * 
 * @param {string} reaction - The type of reaction to add or remove. Can be "FIRE", "COOL", or "HEART".
 * @param {string} target - The target of the reaction. Can be "post", "comment", or "reply".
 * @param {number} postId - The ID of the post, comment, or reply to react to.
 * 
 * @returns {Promise<any>} - The response from the API.
 * 
 * @example
 * const response = await addReaction("FIRE", "post", 123);
 * 
 */

export async function addReaction(
  reaction: "FIRE" | "COOL" | "HEART",
  target: "post" | "comment" | "reply",
  postId: number
) {
  console.log(`posts/${target}/${postId}/addOrRemoveReaction/${reaction}`);
  const res = await apiClient.post(
    `posts/${target}/${postId}/addOrRemoveReaction/${reaction}`
  );
  return res;
}
