import { object, string } from "yup";

export const signupValidation = object().shape({
  name: string().required("Required").min(1, "Not empty"),
  username: string().required("Required").min(1, "Not empty"),
  password: string().required("Required").min(1, "Not empty"),
});

export const loginValidation = object().shape({
  username: string().required("Required").min(1, "Not empty"),
  password: string().required("Required").min(1, "Not empty"),
});
