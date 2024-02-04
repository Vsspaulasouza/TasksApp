import { Stack, useToast } from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { TaskListBar } from ".";
import { NoData } from "..";
import { getTasks } from "../../api";
import {
  isCreatedTaskArray,
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

  const [tasks, setTasks] = useState<CreatedTask[]>([]);

  useEffect(() => {
    const requestTasks = async () => {
      const response = await getTasks();

      if (response != null && isCustomError(response)) {
        const { message } = response;
        showToast(toast, message, "error");
      } else {
        if (isCreatedTaskArray(response)) setTasks(response);
      }
    };

    void requestTasks();
  }, []);

  const orderTasksInitialState: OrderTasksState = {
    title: "initial",
    status: "initial",
    priority: "initial",
  };

  const [orderTasksState, orderTasksDispatch] = useReducer(
    orderTasksReducer,
    orderTasksInitialState
  );

  if (tasks.length === 0) return <NoData text="No tasks created" />;

  let filteredOrderedTasks = filterTasks(tasks, filterTasksState);
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
