import apiClient from '../apiClient';
/**
 * Felhasználók keresése
 * @param query Keresési kifejezés
 * @returns {User[] |null} Felhasználók tömbje, vagy null
 * @see User
 */
export async function searchUsers(query: string) {
  const req = await fetch(`${apiClient.defaults.baseURL}/users/search?search=${query}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  const res = await req.json();
  return res;
}
