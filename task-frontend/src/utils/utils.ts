import { type AlertStatus, type CreateToastFnReturn } from "@chakra-ui/react";
import {
  IoArrowDownOutline,
  IoArrowForwardOutline,
  IoArrowUpOutline,
  IoChevronDownCircleOutline,
  IoEllipseOutline,
  IoStopwatchOutline,
} from "react-icons/io5";
import {
  type CreatedTask,
  type FilterTasksAction,
  type FilterTasksState,
} from "../types";
export function capitalize(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

export function formatCapitalizeLower(text: string) {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function cutText(text: string) {
  const MAX_CHARACTERS = 130;

  if (text.length <= MAX_CHARACTERS) return text;
  return text.slice(0, MAX_CHARACTERS) + "...";
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
    shortTitle: cutText(title),
    statusText: formatCapitalizeLower(status),
    priorityText: formatCapitalizeLower(priority),
    statusIcon: statusIconMap[status],
    priorityIcon: priorityIconMap[priority],
  };
}

export function makeColorTransparent(color: string) {
  return color + "26";
}

export function filterTasksReducer(
  state: FilterTasksState,
  action: FilterTasksAction
): FilterTasksState {
  const { atribute, payload } = action;

  return {
    ...state,
    [atribute]: payload,
  };
}

function hasAnyTrue(values: boolean[]): boolean {
  return values.some((value) => value);
}

export function filterTasks(tasks: CreatedTask[], state: FilterTasksState) {
  const statusArray = Object.values(state).slice(0, 3) as boolean[];
  const priorityArray = Object.values(state).slice(3) as boolean[];

  const statusSelected = hasAnyTrue(statusArray);
  const prioritySelected = hasAnyTrue(priorityArray);

  if (!statusSelected && !prioritySelected) return tasks;

  if (statusSelected && !prioritySelected)
    return tasks.filter((task) => state[task.status]);

  if (!statusSelected && prioritySelected)
    return tasks.filter((task) => state[task.priority]);

  return tasks.filter((task) => state[task.status] && state[task.priority]);
}
