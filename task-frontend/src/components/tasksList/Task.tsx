import {
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { type CreatedTask } from "../../types";
import { generateVisualDataTask } from "../../utils";
import { IconText } from "./IconText";
import { TaskMenu } from "./TaskMenu";

interface TaskProps {
  task: CreatedTask;
}

export function Task({ task }: TaskProps) {
  const {
    title,
    shortTitle,
    statusText,
    statusIcon,
    priorityText,
    priorityIcon,
  } = generateVisualDataTask(task);

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          border="1px solid"
          borderTop="none"
          borderColor="gray.600"
          px={{ base: "3", md: "6" }}
          py={{ base: "1", md: "3" }}
        >
          <Text maxW="75%">{shortTitle}</Text>
          <HStack maxW="20%" spacing="7">
            <Flex w="200px" justifyContent="space-between">
              <IconText Icon={statusIcon} text={statusText} width="66px" />
              <IconText Icon={priorityIcon} text={priorityText} width="82px" />
            </Flex>

            <TaskMenu task={task} />
          </HStack>
        </Flex>
      </PopoverTrigger>
      <PopoverContent w={{ base: "300px", md: "1200px" }}>
        <PopoverArrow />
        <PopoverBody>{title}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
