import { type AlertStatus, type CreateToastFnReturn } from "@chakra-ui/react";
import {
  IoArrowDownOutline,
  IoArrowForwardOutline,
  IoArrowUpOutline,
  IoChevronDownCircleOutline,
  IoEllipseOutline,
  IoStopwatchOutline,
} from "react-icons/io5";
import { type CreatedTask } from "../types";
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

export function generateVisualDataTask(task: CreatedTask) {
  const statusIconMap = {
    TODO: IoEllipseOutline,
    DOING: IoStopwatchOutline,
    DONE: IoChevronDownCircleOutline,
  } as const;

  const priorityIconMap = {
    LOW: IoArrowDownOutline,
    MEDIUM: IoArrowForwardOutline,
    HIGH: IoArrowUpOutline,
  } as const;

  const { title, status, priority } = task;

  return {
    title,
    statusText: formatCapitalizeLower(status),
    priorityText: formatCapitalizeLower(priority),
    statusIcon: statusIconMap[status],
    priorityIcon: priorityIconMap[priority],
  };
}
