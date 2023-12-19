import { type CustomError, type LoginType, type User } from ".";

export function isUser(value: unknown): value is User {
  if (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    "name" in value &&
    typeof value.name === "string" &&
    "username" in value &&
    typeof value.username === "string" &&
    "password" in value &&
    typeof value.password === "string"
  )
    return true;
  return false;
}

export function isLoginType(value: unknown): value is LoginType {
  if (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    "username" in value &&
    typeof value.username === "string" &&
    "password" in value &&
    typeof value.password === "string"
  )
    return true;
  return false;
}

export function isCustomError(value: unknown): value is CustomError {
  if (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    "error" in value &&
    typeof value.error === "string" &&
    "message" in value &&
    typeof value.message === "string" &&
    "statusCode" in value &&
    typeof value.statusCode === "number"
  )
    return true;
  return false;
}
