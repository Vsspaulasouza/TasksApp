import {
  Badge,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { type CreatedTask } from "../../types";
import { generateVisualDataTask, makeColorTransparent } from "../../utils";
import { IconText } from "./IconText";
import { TaskMenu } from "./TaskMenu";

interface TaskProps {
  task: CreatedTask;
}

export function Task({ task }: TaskProps) {
  const { title, statusText, statusIcon, priorityText, priorityIcon } =
    generateVisualDataTask(task);

  const { colorMode } = useColorMode();

  return (
    <Flex
      maxW="100%"
      justifyContent="space-between"
      alignItems="center"
      border="1px solid"
      borderTop="none"
      borderColor={colorMode === "light" ? "#e2e8f0" : "whiteAlpha.300"}
      px={{ base: "3", sm: "6" }}
      py={{ base: "1", sm: "3" }}
    >
      <Popover trigger="hover" placement="auto">
        <PopoverTrigger>
          <Text
            maxW="75%"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            mr="50px"
          >
            {title}
          </Text>
        </PopoverTrigger>
        <PopoverContent
          w={{ base: "250px", md: "1200px" }}
          hidden={title.length <= 150}
        >
          <PopoverArrow />
          <PopoverBody>{title}</PopoverBody>
        </PopoverContent>
      </Popover>
      <Flex ml="10px" gap="50px" alignItems="center">
        <Flex
          w="200px"
          wrap="wrap"
          gap="2"
          display={{ base: "none", lg: "flex" }}
        >
          {task.categories.map((category) => (
            <Badge
              key={category.id}
              color={category.color}
              bgColor={makeColorTransparent(category.color)}
              maxW="100%"
              overflow="clip"
              h="18px"
            >
              {category.name}
            </Badge>
          ))}
        </Flex>
        <IconText Icon={statusIcon} text={statusText} width="66px" />
        <IconText Icon={priorityIcon} text={priorityText} width="82px" />
        <TaskMenu task={task} />
      </Flex>
    </Flex>
  );
}
