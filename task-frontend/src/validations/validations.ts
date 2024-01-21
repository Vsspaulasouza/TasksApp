import { object, string } from "yup";
import { type Priority, type Status } from "../types";

export const signupValidation = object().shape({
  name: string().required("Required").min(1, "Not empty"),
  username: string().required("Required").min(1, "Not empty"),
  password: string().required("Required").min(1, "Not empty"),
});

export const loginValidation = object().shape({
  username: string().required("Required").min(1, "Not empty"),
  password: string().required("Required").min(1, "Not empty"),
});

export const editNameValidation = object().shape({
  name: string().required("Required").min(1, "Not empty"),
});

export const editAuthValidation = object().shape({
  username: string().min(1, "Not empty"),
  password: string().min(1, "Not empty"),
});

export const postTaskValidation = object().shape({
  title: string().required("Required").min(1, "Not empty"),
  status: string()
    .required("Required")
    .oneOf<Status>(["TODO", "DOING", "DONE"]),
  priority: string()
    .required("Required")
    .oneOf<Priority>(["LOW", "MEDIUM", "HIGH"]),
});
