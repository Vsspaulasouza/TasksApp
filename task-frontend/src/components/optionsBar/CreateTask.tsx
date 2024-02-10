import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { type AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import { TaskForm } from "..";
import { getCategories, postTask } from "../../api";
import {
  isCreatedCategoryArray,
  isCustomError,
  type CreatedCategory,
  type CreatedTask,
  type Task,
} from "../../types";
import { showToast } from "../../utils";

export function CreateTask() {
  const toast = useToast();
  const disclosure = useDisclosure();
  const queryClient = useQueryClient();

  const { mutate } = useMutation<CreatedTask, AxiosError, Task>({
    mutationKey: "tasks",
    mutationFn: async (newTask) => {
      return await postTask(newTask);
    },
    onSuccess: (newTask) => {
      disclosure.onClose();
      showToast(toast, "Task created", "success");
      void queryClient.setQueryData<CreatedTask[]>("tasks", (data) => {
        return data === undefined ? [newTask] : [...data, newTask];
      });
    },
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        const { message } = error.response.data;
        showToast(toast, message, "error");
      }
    },
  });

  const onSubmit = async (task: Task) => {
    if (task.categoriesIds?.length === 0) delete task.categoriesIds;
    mutate(task);
  };

  const initialValues: Task = {
    title: "",
    status: "TODO",
    priority: "LOW",
    categoriesIds: [],
  };

  const [categories, setCategories] = useState<CreatedCategory[]>([]);

  useEffect(() => {
    const requestCategories = async () => {
      const response = await getCategories();

      if (response != null && isCustomError(response)) {
        const { message } = response;
        showToast(toast, message, "error");
      } else {
        if (isCreatedCategoryArray(response)) setCategories(response);
      }
    };

    void requestCategories();
  }, []);

  return (
    <>
      <Button
        onClick={disclosure.onOpen}
        variant="outline"
        leftIcon={<IoAddOutline />}
      >
        Create task
      </Button>

      <TaskForm
        textButton="Create"
        onSubmit={onSubmit}
        initialValues={initialValues}
        disclosure={disclosure}
        categories={categories}
        title="Create your task"
      />
    </>
  );
}
