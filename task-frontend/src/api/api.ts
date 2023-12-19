import axios, { AxiosError } from "axios";
import { type LoginType, type User } from "../types";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export async function customRequestToken(url: string, data: User | LoginType) {
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
