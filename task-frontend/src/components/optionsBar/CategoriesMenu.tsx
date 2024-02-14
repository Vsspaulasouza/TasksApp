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
import { useMutation, useQueryClient } from "react-query";
import { CategoryForm, ModalDelete } from "..";
import { requestApi } from "../../api";
import {
  isCustomError,
  type Category,
  type CreatedCategory,
  type EditCategory,
} from "../../types";
import { showToast } from "../../utils";

interface CategoriesMenuProps {
  category: CreatedCategory;
}

export function CategoriesMenu({ category }: CategoriesMenuProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const editDisclosure = useDisclosure();
  const { mutate: editCategory } = useMutation<
    CreatedCategory,
    AxiosError,
    EditCategory
  >({
    mutationKey: "categories",
    mutationFn: async (data) => {
      return await requestApi({
        method: "patch",
        urlPath: "categories",
        id: category.id,
        data,
      });
    },
    onSuccess: () => {
      editDisclosure.onClose();
      showToast(toast, "Category edited", "success");
      void queryClient.invalidateQueries("categories");
    },
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        const { message } = error.response.data;
        showToast(toast, message, "error");
      }
    },
  });

  const handleEdit = async (editData: EditCategory) => {
    editCategory(editData);
  };

  const editInitialValues: Category = {
    name: category.name,
    color: category.color,
  };

  const deleteDisclosure = useDisclosure();
  const { mutate: deleteCategory } = useMutation<CreatedCategory, AxiosError>({
    mutationKey: "categories",
    mutationFn: async () => {
      return await requestApi({
        method: "delete",
        urlPath: "categories",
        id: category.id,
      });
    },
    onSuccess: () => {
      deleteDisclosure.onClose();
      showToast(toast, "Category deleted", "success");
      void queryClient.invalidateQueries("categories");
    },
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        const { message } = error.response.data;
        showToast(toast, message, "error");
      }
    },
  });

  const handleDelete = async () => {
    deleteCategory();
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

      <CategoryForm
        disclosure={editDisclosure}
        initialValues={editInitialValues}
        onSubmit={handleEdit}
        textButton="Edit"
        title="Edit category"
      />

      <ModalDelete
        disclosure={deleteDisclosure}
        handleClick={handleDelete}
        header="Are you sure you want to delete this category?"
      />
    </Menu>
  );
}
