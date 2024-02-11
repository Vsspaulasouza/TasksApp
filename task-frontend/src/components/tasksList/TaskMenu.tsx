import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { type AxiosError } from "axios";
import { IoEllipsisVertical } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ModalDelete, TaskForm } from "..";
import { deleteTask, getCategories, updateTask } from "../../api";
import {
  isCustomError,
  type CreatedCategory,
  type CreatedTask,
  type EditTask,
  type Task as TaskType,
} from "../../types";
import { showToast } from "../../utils";

interface TaskMenuProps {
  task: CreatedTask;
}

export function TaskMenu({ task }: TaskMenuProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const editDisclosure = useDisclosure();
  const editMutation = useMutation<CreatedTask, AxiosError, EditTask>({
    mutationKey: "tasks",
    mutationFn: async (editData) => {
      return await updateTask(task.id, editData);
    },
    onSuccess: () => {
      editDisclosure.onClose();
      showToast(toast, "Task edited", "success");
      void queryClient.invalidateQueries("tasks");
    },
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        const { message } = error.response.data;
        showToast(toast, message, "error");
      }
    },
  });

  const handleEdit = async (editData: EditTask) => {
    editMutation.mutate(editData);
  };

  const categoriesIds = task?.categories.map((category) => category.id);
  const editInitialValues: TaskType = {
    title: task.title,
    status: task.status,
    priority: task.priority,
    categoriesIds,
  };

  const deleteDisclosure = useDisclosure();
  const deleteMutation = useMutation<CreatedTask, AxiosError>({
    mutationKey: "tasks",
    mutationFn: async () => {
      return await deleteTask(task.id);
    },
    onSuccess: () => {
      deleteDisclosure.onClose();
      showToast(toast, "Task deleted", "success");
      void queryClient.invalidateQueries("tasks");
    },
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        const { message } = error.response.data;
        showToast(toast, message, "error");
      }
    },
  });

  const handleDelete = async () => {
    deleteMutation.mutate();
  };

  const categoriesQuery = useQuery<CreatedCategory[], AxiosError>({
    queryKey: "categories",
    queryFn: getCategories,
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        const { message } = error.response.data;
        showToast(toast, message, "error");
      }
    },
  });

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
        categories={categoriesQuery.data ?? []}
        title="Edit task"
      />

      <ModalDelete
        disclosure={deleteDisclosure}
        handleClick={handleDelete}
        header="Are you sure you want to delete this task?"
      />
    </Menu>
  );
}
