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
import { CategoryForm, ModalDelete } from "..";
import { deleteCategory, updateCategory } from "../../api";
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

  const editDisclosure = useDisclosure();
  const handleEdit = async (editData: EditCategory) => {
    const response = await updateCategory(category.id, editData);

    if (response != null && isCustomError(response)) {
      const { message } = response;
      showToast(toast, message, "error");
    } else {
      editDisclosure.onClose();
      location.reload();
    }
  };

  const deleteDisclosure = useDisclosure();
  const editInitialValues: Category = {
    name: category.name,
    color: category.color,
  };

  const handleDelete = async () => {
    const response = await deleteCategory(category.id);

    if (response != null && isCustomError(response)) {
      const { message } = response;
      showToast(toast, message, "error");
    } else {
      showToast(toast, "Category deleted", "success");
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
