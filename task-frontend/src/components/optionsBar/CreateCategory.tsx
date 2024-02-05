import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import { CategoryForm } from "..";
import { postCategory } from "../../api";
import { isCustomError, type Category } from "../../types";
import { showToast } from "../../utils";

export function CreateCategory() {
  const toast = useToast();
  const disclosure = useDisclosure();

  const handleCreate = async (category: Category) => {
    const response = await postCategory(category);

    if (response != null && isCustomError(response)) {
      const { message } = response;
      showToast(toast, message, "error");
    } else {
      disclosure.onClose();
      location.reload();
    }
  };

  const initialValues: Category = {
    name: "",
    color: "#000000",
  };

  return (
    <>
      <Button
        onClick={disclosure.onOpen}
        variant="outline"
        leftIcon={<IoAddOutline />}
      >
        Create category
      </Button>
      <CategoryForm
        disclosure={disclosure}
        onSubmit={handleCreate}
        initialValues={initialValues}
        textButton="Create"
        title="Create your category"
      />
    </>
  );
}
