export interface User {
  name: string;
  username: string;
  password: string;
}

export type CreatedUser = Omit<User, "password"> & { id: number };
export type NameUser = Pick<User, "name">;
export type AuthCredentials = Omit<User, "name">;

export type EditAuth = Partial<AuthCredentials>;

export interface CustomError {
  error?: string;
  message: string;
  statusCode: number;
}

export type MethodType = "get" | "post" | "update" | "delete";

export type Status = "TODO" | "DOING" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH";
export interface Task {
  title: string;
  status: Status;
  priority: Priority;
}

export type CreatedTask = Task & { id: number };
