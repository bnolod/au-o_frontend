import { ReactNode } from "react";
import { HttpErrorTexts } from "../constants/texts"

export interface OnboardingLayoutProps {
  headerText: React.ReactNode;
  heroText: string;
  ctaText: string;
  skippable?: boolean;
}


export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}
export interface User {
  id: number;
  username: string;
  password: string;
  nickname: string;
  role: string;
  email: string;
  isPublic: boolean;
  profileImg: string;
  bio: string;
  dateOfBirth: string;
  dateOfSignup: string;
}
export interface LoginResponse {
  token?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  nickname: string;
  dateOfBirth: string;
}
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export interface IHttpError {
  status: number;
  message?: string | undefined;
  language?: "EN" | "HU";
}

export class HttpError implements IHttpError {
  constructor(
    public status: number,
    public message?: string | undefined,
    public language: "EN" | "HU" = "EN"
  ) {
    this.message =
      message ||
      HttpErrorTexts[status as keyof typeof HttpErrorTexts][language];
    this.status = status;
  }
}
export type TokenResponse = {
  token: string;
};
export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onChangeText?: (query: string) => void;
}
export interface GroupPostData {
  groupName: string;
  groupNickname: string;
  groupIcon: string | null;
}
export interface EventPostData {
  eventName: string;
  attendees: number;
  groupId?: string;
  location: string;
  startDate: string;
  endDate: string;
}
export type PostType = "USER" | "GROUP" | "EVENT" | "INVALID";
export interface PostDispayElementProps {
  onPress: () => void;
  postType: string;
  colorScheme: "light" | "dark";
  authorNickname: string;
  authorProfileImg: string;
  authorUsername: string;
  groupData: GroupPostData | null;
  eventData: EventPostData | null;
}
export interface ImageUploadResponse {
  url: string;
  deleteHash: string;
}
export type PostResponseType = "USERPOST" | "GROUPPOST" | "EVENTPOST";
export type UserPostResponseType = {
  isPublic: boolean;
  bio: string;
  dateOfSignup: string;
  id: number;
  nickname: string;
  profileImg: any;
  username: string;
};
export type ImagePostResponseType = {
  id: number;
  url: string;
  index: number;
  deleteHash: string;
};
export interface PostResponse {
  dateOfCreation: string;
  dateOfUpdate: string;
  group: any;
  images: ImageUploadResponse[];
  location: string;
  postId: number;
  postType: PostResponseType;
  reactionTypeMap: Reactions;
  text: string;
  user: UserPostResponseType;
  comments: Comment[];
  favorite: boolean;
  reactedWith: null | "FIRE" | "HEART" | "COOL";
}
export interface ImageStoreRequest {
  text: string;
  postImages: ImageUploadResponse[];
  location: string;
}


export interface PostCardProps {
  postId: number | null;
  reaction: null | "FIRE" | "HEART" | "COOL";
  preview?: boolean;
  user: UserResponse;
  authorId: number | null;
  groupData?: GroupPostData;
  authorProfileImg: string;
  eventData?: EventPostData;
  authorNickname: string;
  authorUsername: string;
  date: string;
  images: {
    url: string;
    deleteHash: string;
  }[];
  description: string;
  location: string;
  reactions: Reactions;
  comments: Comment[];
  language: "EN" | "HU";
  colorScheme: "light" | "dark";
}
export type CommentContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggleOpen: () => void;
}
export type ImageUploadType = {
  image: string;
  type: string;
};
export interface Comment {
  id: number;
  time: string;
  user: UserPostResponseType;
  text: string;
  reactionTypeMap: Reactions;
  reactedWith: null | "FIRE" | "HEART" | "COOL";
  replies: Reply[] | null;
}
export interface Reply {
  id: number;
  time: string;
  reactionTypeMap: Reactions;
  reactedWith: null | "FIRE" | "HEART" | "COOL";
  user: UserPostResponseType;
  text: string;
}
export interface LoadingModalProps {
  loading: boolean;
  text?: string;
  onStart?: () => void;
  onEnd?: () => void;
}
export type Reactions = {
  FIRE: number;
  HEART: number;
  COOL: number;
};
export type Geolocation = {
  lat: number;
  lng: number;
};
export interface CommonStaticElementProps {
  children?: ReactNode;
  language: "EN" | "HU";
  colorScheme: "light" | "dark";
}
export interface AvatarProps {
  image: any;
  className?: string;
  nickname?: string;
  width?: number | string;
  height?: number | string;
}
export interface DropdownWrapperProps {
  visible: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  width: number;
  children: ReactNode;
}
export type UserResponse = User | null | undefined;

export type ReactionState = {
  fire: number;
  heart: number;
  sunglasses: number;
};
export interface AddCommentRowProps {
  authorNickname: string;
  focus: boolean;
  postId: number;
  onPostComment: (res: Comment) => void;
}
export interface CommentSheetProps {
  comments: Comment[];
  authorNickname: string;
  preview?: boolean;
  userNickname: string;
  postId: number;
  userProfileImg: string;
  authorId: number;
  userId: number;
}
export interface PostCarouselElementProps {
  images: string[];
  index: number;
}
export interface PostOptionMenuProps {
  preview: boolean,
  language: "EN" | "HU",
  postId: number,
  userId: number | null,
  authorId: number | null,
  onDelete?: () => void
}

export interface PostCreationSheetElementProps {
    group?: any;
    event?: any;
    onPress: (selected: any) => void;
    title: string;
}
export interface OnboardHeaderProps {
  isStatic?: boolean;
  onBackPress?: () => void;
  onSkipPress?: () => void;
  index?: number;
}
export interface CommentElementProps {
    item: Comment;
    userId: number;
    onDelete: (id: number) => void;
    authorId: number;
}
export interface FilterBarProps {
  onChange: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
}
export interface ReplyProps {
    item: Reply;
    language: "HU" | "EN";
    userId: number;
    authorId: number;
    onDelete: (id: number) => void;
}
export interface TextEditModalProps {
  visible: boolean;
  onSave: (text: string) => void;
  onCancel?: () => void;
  initialValue?: string;
  labelComponent?: ReactNode;
  placeholder?: string;
  lines?: number;
}

export interface Car {
  id: string,
  manufacturer: string,
  model: string,
  type: CarType,
  horsepower: number,
  description: string,
  displacement: number
}
export type CarType =
   "SEDAN"
  |"COUPE" 
  |"GRANDCOUPE"
  |"HATCH"
  |"KOMBI"
  |"CABRIOLET"
  |"PICKUP"
  |"ROADSTER"
  |"SUV"

  export interface GroupMessage {
    message: string;
    user: User
  }