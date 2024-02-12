import { type Method } from "axios";

export interface User {
  name: string;
  username: string;
  password: string;
}

export type CreatedUser = Omit<User, "password"> & { id: number };
export type NameUser = Pick<User, "name">;
export type AuthCredentials = Omit<User, "name">;

export type EditAuth = Partial<AuthCredentials>;
export type EditNameUser = Partial<NameUser>;

export interface CustomError {
  error?: string;
  message: string;
  statusCode: number;
}

export type MethodType = "get" | "post" | "update" | "delete";

export type Status = "TODO" | "DOING" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type CategoriesIds = number[];
export interface Task {
  title: string;
  status: Status;
  priority: Priority;
  categoriesIds?: CategoriesIds;
}

export type CreatedTask = Omit<Task, "categoriesIds"> & {
  id: number;
  categories: CreatedCategory[];
};

export type EditTask = Partial<Task>;

export interface Category {
  name: string;
  color: string;
}

export type CreatedCategory = Category & { id: number };

export type EditCategory = Partial<Category>;

export interface FilterTasksAction {
  atribute: Status | Priority;
  payload: boolean;
}

export interface FilterTasksState {
  TODO: boolean;
  DOING: boolean;
  DONE: boolean;

  LOW: boolean;
  MEDIUM: boolean;
  HIGH: boolean;
}

export type Order = "initial" | "ascending" | "descending";
export type OrderAttribute = "title" | "status" | "priority";

export interface OrderTasksAction {
  atribute: OrderAttribute;
  order: Order;
}

export interface OrderTasksState {
  title: Order;
  status: Order;
  priority: Order;
}

export interface RequestApiAttributes<T> {
  method?: Method;
  urlPath: string;
  id?: number;
  data?: T;
}
