import {
  type AuthCredentials,
  type CreatedTask,
  type CreatedUser,
  type CustomError,
} from ".";

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

export function isAuthCredentials(value: unknown): value is AuthCredentials {
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

export function isCreatedTask(value: unknown): value is CreatedTask {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    "id" in value &&
    typeof value.id === "number" &&
    "title" in value &&
    typeof value.title === "string" &&
    "status" in value &&
    typeof value.status === "string" &&
    "priority" in value &&
    typeof value.priority === "string"
  );
}

export function isCreatedTaskArray(value: unknown): value is CreatedTask[] {
  return (
    value !== undefined &&
    value !== null &&
    value instanceof Array &&
    isCreatedTask(value[0])
  );
}
