import {
  type AuthCredentials,
  type CreatedCategory,
  type CreatedTask,
  type CreatedUser,
  type CustomError,
  type Order,
  type Priority,
  type Status,
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
    (typeof value.message === "string" || value.message instanceof Array) &&
    "statusCode" in value &&
    typeof value.statusCode === "number"
  );
}

export function isStatus(value: unknown): value is Status {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "string" &&
    (value === "TODO" || value === "DOING" || value === "DONE")
  );
}

export function isPriority(value: unknown): value is Priority {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "string" &&
    (value === "LOW" || value === "MEDIUM" || value === "HIGH")
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
    isStatus(value.status) &&
    "priority" in value &&
    isPriority(value.priority)
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

export function isCreatedCategory(value: unknown): value is CreatedCategory {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string" &&
    "color" in value &&
    typeof value.color === "string"
  );
}

export function isCreatedCategoryArray(
  value: unknown
): value is CreatedCategory[] {
  return (
    value !== undefined &&
    value !== null &&
    value instanceof Array &&
    isCreatedCategory(value[0])
  );
}

export function isOrder(value: unknown): value is Order {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "string" &&
    (value === "initial" || value === "ascending" || value === "descending")
  );
}

export function isOrderAtribute(
  value: unknown
): value is "title" | "status" | "priority" {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "string" &&
    (value === "title" || value === "status" || value === "priority")
  );
}
