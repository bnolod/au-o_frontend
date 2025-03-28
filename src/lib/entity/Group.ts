import { User, UserResponse } from "./User";

export interface Group {
  id: number;
  name: string;
  alias: string;
  bannerImage: string;
  memberCount: number;
  public: boolean;
  creationDate: string;
  member: boolean;
  description: string;
  validMember : boolean;
}

export interface GroupPost {
  groupName: string;
  groupNickname: string;
  groupIcon: string | null;
}
export interface GroupMemberResponse {
  user: UserResponse;
  role: string;
  joinedDate: string;
  valid: boolean
}
export interface GroupMemberListResponse {
  group: Group
  users: GroupMemberResponse[]
}