export interface User {
  name: string;
  username: string;
  password: string;
}

export interface LoginType {
  username: string;
  password: string;
}

export interface CustomError {
  error?: string;
  message: string;
  statusCode: number;
}

export type MethodType = "get" | "post" | "update" | "delete";
