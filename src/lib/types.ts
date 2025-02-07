import { HttpErrorTexts } from "../constants/texts"

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

export interface LoginRequest {
    usernameOrEmail: string
    password: string
}
export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  nickname: string;
  dateOfBirth: string;
}
export enum UserRole {
    USER,
    ADMIN
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface IHttpError {

  
    status: number;
    message?: string | undefined;
    language?: "EN" | "HU";
  }
  
  export class HttpError implements IHttpError {
    constructor(public status: number, public message?: string | undefined, public language: "EN" | "HU" = "EN") {
      this.message = message || HttpErrorTexts[(status) as keyof typeof HttpErrorTexts][language];
      this.status = status;
      
    }
  }

export interface CommentContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggleOpen: () => void;
}