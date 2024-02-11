import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { type AxiosError } from "axios";
import { IoAddOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import { CategoryForm } from "..";
import { requestApi } from "../../api";
import {
  isCustomError,
  type Category,
  type CreatedCategory,
} from "../../types";
import { showToast } from "../../utils";

export function CreateCategory() {
  const toast = useToast();
  const disclosure = useDisclosure();
  const queryClient = useQueryClient();

  const { mutate } = useMutation<CreatedCategory, AxiosError, Category>({
    mutationKey: "categories",
    mutationFn: async (data) => {
      return await requestApi({ method: "post", urlPath: "categories", data });
    },
    onSuccess: (newCategory) => {
      disclosure.onClose();
      showToast(toast, "Category created", "success");
      void queryClient.setQueryData<CreatedCategory[]>("categories", (data) => {
        return data === undefined ? [newCategory] : [...data, newCategory];
      });
    },
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        const { message } = error.response.data;
        showToast(toast, message, "error");
      }
    },
  });

  const onSubmit = async (category: Category) => {
    mutate(category);
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
        onSubmit={onSubmit}
        initialValues={initialValues}
        textButton="Create"
        title="Create your category"
      />
    </>
  );
}
