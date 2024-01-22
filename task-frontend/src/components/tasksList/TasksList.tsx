import { Stack } from "@chakra-ui/react";
import { Task } from "./Task";

export function TasksList() {
  return (
    <Stack spacing="0">
      <Task />
      <Task />
      <Task />
    </Stack>
  );
}
