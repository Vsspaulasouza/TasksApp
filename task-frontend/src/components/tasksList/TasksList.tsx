import { Flex, Stack, Text, useColorMode, useToast } from "@chakra-ui/react";
import { Empty } from "antd";
import { useEffect, useState } from "react";
import { TaskListBar } from ".";
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
  const { colorMode } = useColorMode();

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

  return tasks.length === 0 ? (
    <Flex justifyContent="center" alignItems="center">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <Text color={colorMode === "dark" ? "#EDEEEE" : "#2D3753"}>
            No tasks created
          </Text>
        }
        style={{
          width: "300px",
          height: "300px",
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "7px",
          backgroundColor: colorMode === "light" ? "#F6F6F6" : "unset",
        }}
      />
    </Flex>
  ) : (
    <>
      <TaskListBar />
      <Stack spacing="0">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Stack>
    </>
  );
}
