import { Flex, Text } from "@chakra-ui/react";
import { type CreatedTask } from "../../types";
import { generateVisualDataTask } from "../../utils";
import { IconText } from "./IconText";

interface TaskProps {
  task: CreatedTask;
}

export function Task({ task }: TaskProps) {
  const { title, statusText, statusIcon, priorityText, priorityIcon } =
    generateVisualDataTask(task);

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
      <Flex maxW="15%" w="185px" justifyContent="space-between">
        <IconText Icon={statusIcon} text={statusText} />
        <IconText Icon={priorityIcon} text={priorityText} />
      </Flex>
    </Flex>
  );
}
