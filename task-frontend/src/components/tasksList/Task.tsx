import { Flex, Text } from "@chakra-ui/react";
import { type CreatedTask } from "../../types";
import { formatCapitalizeLower } from "../../utils";

interface TaskProps {
  task: CreatedTask;
}

export function Task({ task }: TaskProps) {
  const { title, status, priority } = task;

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      border="1px solid"
      borderTop="none"
      borderColor="gray.600"
      px={{ base: "3", md: "6" }}
      py={{ base: "1", md: "3" }}
    >
      <Text maxW="80%">{title}</Text>
      <Flex maxW="15%" w="150px" justifyContent="space-between">
        <Text>{formatCapitalizeLower(status)}</Text>
        <Text>{formatCapitalizeLower(priority)}</Text>
      </Flex>
    </Flex>
  );
}
