import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { showToast } from "../../utils";
import { TaskForm } from "../optionsBar/TaskForm";

interface TaskMenuProps {
  task: CreatedTask;
}

export function TaskMenu({ task }: TaskMenuProps) {
  const toast = useToast();

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

  const deleteDisclosure = useDisclosure();
  const editInitialValues: TaskType = {
    title: task.title,
    status: task.status,
    priority: task.priority,
  };

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

  return (
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
    </Menu>
  );
}
