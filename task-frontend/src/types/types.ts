export interface User {
  name: string;
  username: string;
  password: string;
}

export type CreatedUser = Omit<User, "password"> & { id: number };
export type NameUser = Pick<User, "name">;
export type AuthCredentials = Omit<User, "name">;

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
