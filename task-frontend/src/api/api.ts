import axios, { AxiosError } from "axios";
import {
  type AuthCredentials,
  type EditAuth,
  type NameUser,
  type User,
} from "../types";
import { getToken } from "../utils";
import {
  type Category,
  type EditCategory,
  type EditTask,
  type Task,
} from "./../types/types";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export async function customRequestToken(
  url: string,
  data: User | AuthCredentials
) {
  try {
    const result = await instance({ method: "post", url, data });
    const token = result.data.access_token;
    if (typeof token === "string") window.localStorage.setItem("token", token);

    return result;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}

export async function getUser() {
  try {
    const token = getToken();
    const result = await instance({
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
      url: "/users/me",
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}

export async function updateName(name: NameUser) {
  try {
    const token = getToken();
    const result = await instance({
      method: "patch",
      headers: { Authorization: `Bearer ${token}` },
      url: "/users/me",
      data: name,
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}

export async function updateAuth(authCredentials: EditAuth) {
  try {
    const token = getToken();
    const result = await instance({
      method: "patch",
      headers: { Authorization: `Bearer ${token}` },
      url: "/auth/me",
      data: authCredentials,
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}

export async function deleteUser() {
  try {
    const token = getToken();
    const result = await instance({
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
      url: "/users/me",
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}

export async function postTask(data: Task) {
  try {
    const token = getToken();
    const result = await instance({
      method: "post",
      headers: { Authorization: `Bearer ${token}` },
      url: "/tasks",
      data,
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}

export async function getTasks() {
  try {
    const token = getToken();
    const result = await instance({
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
      url: "/tasks",
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}

export async function deleteTask(taskId: number) {
  try {
    const token = getToken();
    const result = await instance({
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
      url: `/tasks/${taskId}`,
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}

export async function updateTask(taskId: number, data: EditTask) {
  try {
    const token = getToken();
    const result = await instance({
      method: "patch",
      headers: { Authorization: `Bearer ${token}` },
      url: `/tasks/${taskId}`,
      data,
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}

export async function postCategory(data: Category) {
  try {
    const token = getToken();
    const result = await instance({
      method: "post",
      headers: { Authorization: `Bearer ${token}` },
      url: "/categories",
      data,
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}

export async function getCategories() {
  try {
    const token = getToken();
    const result = await instance({
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
      url: "/categories",
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}

export async function deleteCategory(categoryId: number) {
  try {
    const token = getToken();
    const result = await instance({
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
      url: `/categories/${categoryId}`,
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}

export async function updateCategory(categoryId: number, data: EditCategory) {
  try {
    const token = getToken();
    const result = await instance({
      method: "patch",
      headers: { Authorization: `Bearer ${token}` },
      url: `/categories/${categoryId}`,
      data,
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
    throw error;
  }
}
