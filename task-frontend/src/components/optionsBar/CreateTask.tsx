import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { TaskForm } from "..";
import { getCategories, postTask } from "../../api";
import {
  isCreatedCategoryArray,
  isCustomError,
  type CreatedCategory,
  type Task,
} from "../../types";
import { showToast } from "../../utils";

export function CreateTask() {
  const toast = useToast();

  const disclosure = useDisclosure();

  const onSubmit = async (task: Task) => {
    const response = await postTask(task);

    if (response != null && isCustomError(response)) {
      const { message } = response;
      showToast(toast, message, "error");
    } else {
      disclosure.onClose();
      location.reload();
    }
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
      />
    </>
  );
}
