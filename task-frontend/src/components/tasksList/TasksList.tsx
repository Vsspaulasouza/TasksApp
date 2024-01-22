import { Stack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTasks } from "../../api";
import {
  isCreatedTaskArray,
  isCustomError,
  type CreatedTask,
} from "../../types";
import { showToast } from "../../utils";
import { Task } from "./Task";

export function TasksList() {
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

  return (
    <Stack spacing="0">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </Stack>
  );
}
