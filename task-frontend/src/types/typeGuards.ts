import { type CreatedUser, type CustomError, type LoginType } from ".";

export function isCreatedUser(value: unknown): value is CreatedUser {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string" &&
    "username" in value &&
    typeof value.username === "string"
  );
}

export function isLoginType(value: unknown): value is LoginType {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    "username" in value &&
    typeof value.username === "string" &&
    "password" in value &&
    typeof value.password === "string"
  );
}

export function isCustomError(value: unknown): value is CustomError {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    "message" in value &&
    typeof value.message === "string" &&
    "statusCode" in value &&
    typeof value.statusCode === "number"
  );
}
