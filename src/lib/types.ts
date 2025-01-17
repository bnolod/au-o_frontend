import { HttpErrorTexts } from "../constants/texts"

export interface User {
    id: number
    username: string
    password: string
    nickname: string
    role_id: UserRole  
    email: string
    isPublic: boolean
    profile_img: string
    date_of_birth: string
    date_of_signup: string
}

export interface LoginRequest {
    usernameOrEmail: string
    password: string
}
export interface RegisterRequest {
    username: string;
    email: string;
    nickname: string
    password: string
    date_of_birth: string

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