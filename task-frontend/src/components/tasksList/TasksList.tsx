import { Stack, useToast } from "@chakra-ui/react";
import { type AxiosError } from "axios";
import { useMemo, useReducer } from "react";
import { useQuery } from "react-query";
import { TaskListBar } from ".";
import { NoData } from "..";
import { requestApi } from "../../api";
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
  const { data: tasks } = useQuery<CreatedTask[], AxiosError>({
    queryKey: "tasks",
    queryFn: async () => {
      return await requestApi({ urlPath: "tasks" });
    },
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        const { message } = error.response.data;
        showToast(toast, message, "error");
      }
    },
  });

  const orderTasksInitialState: OrderTasksState = {
    title: "initial",
    status: "initial",
    priority: "initial",
  };

  const [orderTasksState, orderTasksDispatch] = useReducer(
    orderTasksReducer,
    orderTasksInitialState
  );
  const filteredTasks = useMemo(
    () => filterTasks(tasks ?? [], filterTasksState),
    [tasks, filterTasksState]
  );

  const orderedTasks = useMemo(
    () => orderTasks(filteredTasks, orderTasksState),
    [filteredTasks, orderTasksState]
  );

  if (tasks === undefined || tasks.length === 0)
    return <NoData text="No tasks created" />;

  return (
    <>
      <TaskListBar
        orderTasksState={orderTasksState}
        orderTasksDispatch={orderTasksDispatch}
      />
      <Stack spacing="0">
        {orderedTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Stack>
    </>
  );
}
