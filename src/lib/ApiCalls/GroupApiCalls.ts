/**
 * Csoportokhoz kapcsolódó API hívások
 * @module ApiCalls/GroupApiCalls
 * @category API
 */


import { apiFetch } from '../apiClient';
import { GroupCreationRequest } from '../request/GroupCreationRequest';
import { Group, GroupMemberListResponse, GroupMemberResponse, Status } from '../entity/Group';
import { ImageStoreRequest } from '../request/ImgurRequest';
import { Post } from '../entity/Post';
/**
 * Csoport létrehozása
 * @param request Csoport létrehozásához szükséges adatok
 * @returns {Promise<Group | null>} Csoport objektum, vagy null, ha a csoport létrehozása nem sikerült
 */
export async function createGroup(request: GroupCreationRequest) {
  const req = await apiFetch<Group>('groups/group', 'POST', true, request);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Csoport lekérdezése
 * 
 * @param {number} groupId A csoport azonosítója
 * @returns {Promise<Group | null>} A csoport, vagy null
 * @see Group
 */
export async function getGroup(groupId: string) {
  const req = await apiFetch<Group>('groups/group/' + groupId, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Összes csoport lekérdezése
 * 
 * @returns {Promise<Group[] | null>} Az összes csoport, vagy null
 * @see Group
 * @deprecated
 * 
 *  Feedre cserélni
 */
export async function getAllGroups() {
  //temporary
  const req = await apiFetch<Group[]>('groups/all', 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Csoporthoz tartozó függőben lévő tagok lekérdezése
 * @param id Csoport azonosító
 * @param role Csoport role
 * @returns {Promise<GroupMemberResponse[] | null>} Visszatér a csoport tagjaival, vagy null
 * @see GroupMemberResponse
 */
export async function getPendingMembers(id: number, role: Status) {
  if (role === "MEMBER") return null;
  const req = await apiFetch<GroupMemberResponse[]>(`groups/group/${id}/pending`, 'GET', true);

  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Csoport módosítása
 * @param groupId Csoport ID
 * @param request Csoport módosítási kérés
 * @returns {Promise<boolean>} Módosítás sikeressége
 * @see GroupEditRequest
 */
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
/**
 * Saját csoportok lekérdezése
 * @returns {Promise<Group[] | null>} Az összes csoport, vagy null
 */
export async function getOwnGroups() {
  const req = await apiFetch<Group[]>('groups/own', 'GET', true);
  if (req && req.status === 200) return req.data;
  else return null;
}
/**
 * Csoport jelentkezés vagy elutasítás
 * @param groupId Csoport ID
 * @param userId Felhasználó ID
 * @param accept Elfogadás vagy elutasítás
 * @returns {Promise<Group | null>} A csoport, vagy null
 */
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
/**
 * Jelentkezés csoportba
 * @param groupId Csoport ID
 * @returns {Promise<Group | null>} A csoport, vagy null
 * @see Group
 */
export async function joinGroup(groupId: number) {
  const req = await apiFetch<Group>('groups/group/' + groupId + '/join', 'POST', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Csoport elhagyása
 * @param groupId Csoport ID
 * @returns {Promise<number>} HTTP státusz kód
 */
export async function leaveGroup(groupId: number) {
  const req = await apiFetch('groups/group/' + groupId + '/leave', 'POST', true);
  return req!.status;
}
/**
 * Csoport tagjainak lekérdezése
 * @param groupId Csoport ID
 * @returns {Promise<GroupMemberListResponse | null>} Csoport tagjai, vagy null
 * @see GroupMemberListResponse
 */
export async function getGroupMembers(groupId: number) {
  const req = await apiFetch<GroupMemberListResponse>(`groups/group/${groupId}/members`, 'GET', true);
  if (req) return req

}
/**
 * Csoport státuszának lekérdezése
 * @param groupId Csoport ID
 * @returns {Promise<GroupMemberResponse | null>} Csoport státusza, vagy null
 * @see GroupMemberResponse
 */
export async function getGroupStatus(groupId: number) {
  const req = await apiFetch<GroupMemberResponse>('groups/group/' + groupId + '/status', 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Csoport posztok lekérdezése
 * @param id Csoport ID
 * @returns {Promise<Post[] | null>} Csoport posztok, vagy null
 * @see Post
 */
export async function getGroupPosts(id: number) {
  const req = await apiFetch<Post[]>(`groups/group/${id}/posts`, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;

}