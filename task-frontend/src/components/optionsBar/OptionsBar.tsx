import { Button, HStack, useDisclosure, useToast } from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import { postTask } from "../../api";
import { isCustomError, type Task } from "../../types";
import { showToast } from "../../utils";
import { TaskForm } from "../TaskForm";

export function OptionsBar() {
  const disclosure = useDisclosure();

  const toast = useToast();

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

  const initialValues: Task = { title: "", status: "TODO", priority: "LOW" };

  return (
    <HStack pt={{ base: "8", md: "10" }} pb={{ base: "3", md: "5" }}>
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
    </HStack>
  );
}
