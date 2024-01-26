import {
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IoEllipsisVertical } from "react-icons/io5";
import { ModalDelete } from "..";
import { deleteTask, updateTask } from "../../api";
import {
  isCustomError,
  type CreatedTask,
  type EditTask,
  type Task as TaskType,
} from "../../types";
import { generateVisualDataTask, showToast } from "../../utils";
import { TaskForm } from "../optionsBar/TaskForm";
import { IconText } from "./IconText";

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

  const toast = useToast();

  const deleteDisclosure = useDisclosure();

  const handleDelete = async () => {
    const response = await deleteTask(task.id);

    if (response != null && isCustomError(response)) {
      const { message } = response;
      showToast(toast, message, "error");
    } else {
      showToast(toast, "Task deleted", "success");
      deleteDisclosure.onClose();
      location.reload();
    }
  };

  const editDisclosure = useDisclosure();

  const handleEdit = async (editData: EditTask) => {
    const response = await updateTask(task.id, editData);

    if (response != null && isCustomError(response)) {
      const { message } = response;
      showToast(toast, message, "error");
    } else {
      editDisclosure.onClose();
      location.reload();
    }
  };

  const editInitialValues: TaskType = {
    title: task.title,
    status: task.status,
    priority: task.priority,
  };

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
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<IoEllipsisVertical />}
                isRound
                variant="solid"
              />
              <MenuList>
                <MenuItem onClick={editDisclosure.onOpen}>Edit</MenuItem>
                <MenuItem onClick={deleteDisclosure.onOpen}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </PopoverTrigger>
      <PopoverContent w={{ base: "300px", md: "1200px" }}>
        <PopoverArrow />
        <PopoverBody>{title}</PopoverBody>
      </PopoverContent>

      <TaskForm
        disclosure={editDisclosure}
        initialValues={editInitialValues}
        onSubmit={handleEdit}
        textButton="Edit"
      />

      <ModalDelete
        disclosure={deleteDisclosure}
        handleClick={handleDelete}
        header="Are you sure you want to delete this task?"
      />
    </Popover>
  );
}
