import { type AlertStatus, type CreateToastFnReturn } from "@chakra-ui/react";

export function capitalize(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

export function formatCapitalizeLower(text: string) {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function showToast(
  toast: CreateToastFnReturn,
  message: string,
  status: AlertStatus
) {
  toast({
    title: message,
    status,
    position: "top",
    duration: 5000,
    isClosable: true,
  });
}

export function getToken() {
  return window.localStorage.getItem("token");
}

export function removeToken() {
  window.localStorage.removeItem("token");
}
