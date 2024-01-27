import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import { TaskForm } from "..";
import { postTask } from "../../api";
import { isCustomError, type Task } from "../../types";
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
  };

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
      />
    </>
  );
}