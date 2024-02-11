import axios, { AxiosError } from "axios";
import {
  type AuthCredentials,
  type EditAuth,
  type NameUser,
  type User,
} from "../types";
import { getToken } from "../utils";
import { type RequestApiAttributes } from "./../types/types";

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

export async function requestApi<T>({
  method = "get",
  urlPath,
  id,
  data,
}: RequestApiAttributes<T>) {
  const token = getToken();
  const result = await instance({
    method,
    headers: { Authorization: `Bearer ${token}` },
    url: `/${urlPath}/${id ?? ""}`,
    data,
  });

  return result.data;
}
