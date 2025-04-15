import { apiFetch } from '../apiClient';
import { GroupCreationRequest } from '../request/GroupCreationRequest';
import { Group, GroupMemberListResponse, GroupMemberResponse, Status } from '../entity/Group';
import { ImageStoreRequest } from '../request/ImgurRequest';
import { Post } from '../entity/Post';

export async function createGroup(request: GroupCreationRequest) {
  const req = await apiFetch<Group>('groups/group', 'POST', true, request);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function getGroup(groupId: string) {
  const req = await apiFetch<Group>('groups/group/' + groupId, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function getAllGroups() {
  //temporary
  const req = await apiFetch<Group[]>('groups/all', 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function getPendingMembers(id: number, role: Status) {
  if (role === "MEMBER") return null;
  const req = await apiFetch<GroupMemberResponse[]>(`groups/group/${id}/pending`, 'GET', true);

  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function modifyGroup(groupId: number, request: GroupEditRequest) {
  const req = await apiFetch<Group>(`groups/group/${groupId}`, "PUT", true, request )
  return req!.status === 200
}
export interface GroupEditRequest {
  /**
   * Csoport neve
   * @type {string}
   */
  name: string;
  /**
   * Csoport leírása
   * @type {string}
   */

  description: string;
  /**
   * Csoport rövidített neve
   * @type {string}
   */
  alias: string;
  /**
   * Csoport láthatósága (publikus?)
   * @type {boolean}
   */
  public: boolean;
}

export async function getOwnGroups() {
  const req = await apiFetch<Group[]>('groups/own', 'GET', true);
  if (req && req.status === 200) return req.data;
  else return null;
}

export async function handleJoinRequest(groupId: number, userId: number, accept: boolean) {
  const req = await apiFetch('groups/handleJoinRequest/' + groupId + '/' + userId + '/' + accept, 'POST', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Csoport jelentkezési kérés visszavonásának kezelése
 * 
 * @param {group} group Csoport entitás
 * @param {"HU" | "EN"} language Nyelv
 * @returns {Promise<void>}
 */

export async function postToGroup(groupId: number, post: ImageStoreRequest) {
  const req = await apiFetch<Post>(`groups/group/${groupId}/post`, 'POST', true, post);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}

export async function joinGroup(groupId: number) {
  const req = await apiFetch<Group>('groups/group/' + groupId + '/join', 'POST', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function leaveGroup(groupId: number) {
  const req = await apiFetch('groups/group/' + groupId + '/leave', 'POST', true);
  return req!.status;
}
export async function getGroupMembers(groupId: number) {
  const req = await apiFetch<GroupMemberListResponse>(`groups/group/${groupId}/members`, 'GET', true);
  if (req) return req

}
export async function getGroupStatus(groupId: number) {
  const req = await apiFetch<GroupMemberResponse>('groups/group/' + groupId + '/status', 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function getGroupPosts(id: number) {
  const req = await apiFetch<Post[]>(`groups/group/${id}/posts`, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;

}