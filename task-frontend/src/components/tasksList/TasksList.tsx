import { Stack, useToast } from "@chakra-ui/react";
import { type AxiosError } from "axios";
import { useReducer } from "react";
import { useQuery } from "react-query";
import { TaskListBar } from ".";
import { NoData } from "..";
import { getTasks } from "../../api";
import {
  isCustomError,
  type CreatedTask,
  type FilterTasksState,
  type OrderTasksState,
} from "../../types";
import {
  filterTasks,
  orderTasks,
  orderTasksReducer,
  showToast,
} from "../../utils";
import { Task } from "./Task";

interface TasksListProps {
  filterTasksState: FilterTasksState;
}

export function TasksList({ filterTasksState }: TasksListProps) {
  const toast = useToast();
  const { isError, data, error } = useQuery<CreatedTask[], AxiosError>(
    "tasks",
    getTasks
  );

  if (isError && isCustomError(error.response?.data)) {
    const { message } = error.response.data;
    showToast(toast, message, "error");
  }

  const orderTasksInitialState: OrderTasksState = {
    title: "initial",
    status: "initial",
    priority: "initial",
  };

  const [orderTasksState, orderTasksDispatch] = useReducer(
    orderTasksReducer,
    orderTasksInitialState
  );

  if (data === undefined || data.length === 0)
    return <NoData text="No tasks created" />;

  let filteredOrderedTasks = filterTasks(data, filterTasksState);
  filteredOrderedTasks = orderTasks(filteredOrderedTasks, orderTasksState);

  return (
    <>
      <TaskListBar
        orderTasksState={orderTasksState}
        orderTasksDispatch={orderTasksDispatch}
      />
      <Stack spacing="0">
        {filteredOrderedTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Stack>
    </>
  );
}
