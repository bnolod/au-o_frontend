/**
 * Felhasználókhoz kapcsolódó API hívások
 * @module ApiCalls/WsApiCalls
 * @category API
 */
import { apiFetch } from '../apiClient';
import LatestMessage from '../entityWs/LatestMessage';
import { User } from '../types';

export async function getActiveUsers() {
  const res = await apiFetch<User[]>('public/activeusers/all', 'GET', true);
  if (res && res.status === 200) {
    console.log('active:' + res.data);
    return res.data;
  }
  return null;
}

export async function getLatestMessages() {
  const res = await apiFetch<LatestMessage[]>('public/activeusers/messagelist', 'GET', true);
  if (res && res.status === 200) {
    console.log('active:' + res.data);
    return res.data;
  }
  return null;
}
