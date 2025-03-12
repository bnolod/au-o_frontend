import { apiFetch } from "../apiClient";
import { User } from "../types";

export async function getActiveUsers() {
  const res = await apiFetch<User[]>('public/activeusers/all', 'GET', true);
  if (res && res.status === 200) {
            console.log("active:"+ res.data)
    return res.data;
  }
  return null;
}