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
  type OrderTasksAction,
} from "../types";
import {
  type OrderTasksState,
  type Priority,
  type Status,
} from "./../types/types";
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

export function orderTasksReducer(
  _state: OrderTasksState,
  action: OrderTasksAction
): OrderTasksState {
  const { atribute, order } = action;
  const initialState: OrderTasksState = {
    title: "initial",
    status: "initial",
    priority: "initial",
  };

  return {
    ...initialState,
    [atribute]: order,
  };
}

function compareStrings(str1: string, str2: string) {
  if (str1 > str2) return 1;
  if (str1 < str2) return -1;
  return 0;
}

function compareStatus(status1: Status, status2: Status): number {
  const order = {
    TODO: 0,
    DOING: 1,
    DONE: 2,
  };
  // const order = ["TODO", "DOING", "DONE"];
  return order[status1] - order[status2];
}

function comparePriority(priority1: Priority, priority2: Priority): number {
  const order = { LOW: 0, MEDIUM: 1, HIGH: 2 };
  // const order = ["LOW", "MEDIUM", "HIGH"];
  return order[priority1] - order[priority2];
}

export function orderTasks(tasks: CreatedTask[], state: OrderTasksState) {
  if (
    state.title === "initial" &&
    state.status === "initial" &&
    state.priority === "initial"
  )
    return tasks;

  const sortedTasks = [...tasks];

  for (const key in state) {
    if (key === "title" && state[key] === "ascending") {
      sortedTasks.sort((a, b) => compareStrings(a.title, b.title));
    } else if (key === "title" && state[key] === "descending") {
      sortedTasks.sort((a, b) => compareStrings(b.title, a.title));
    } else if (key === "status" && state[key] === "ascending") {
      sortedTasks.sort((a, b) => compareStatus(a.status, b.status));
    } else if (key === "status" && state[key] === "descending") {
      sortedTasks.sort((a, b) => compareStatus(b.status, a.status));
    } else if (key === "priority" && state[key] === "ascending") {
      sortedTasks.sort((a, b) => comparePriority(a.priority, b.priority));
    } else if (key === "priority" && state[key] === "descending") {
      sortedTasks.sort((a, b) => comparePriority(b.priority, a.priority));
    }
  }

  return sortedTasks;
}
