import { MenuItem, useDisclosure, useToast } from "@chakra-ui/react";
import { IoTrashSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ModalDelete } from "..";
import { deleteUser } from "../../api";
import { isCustomError } from "../../types";
import { showToast } from "../../utils";

export function DeleteUserItem() {
  const toast = useToast();
  const navigate = useNavigate();

  const disclosure = useDisclosure();

  const handleClick = async () => {
    const response = await deleteUser();

    if (response != null && isCustomError(response)) {
      const { message } = response;
      showToast(toast, message, "error");
    } else {
      showToast(toast, "User deleted", "success");
      disclosure.onClose();
      navigate("/auth/signup");
    }
  };

  return (
    <>
      <MenuItem icon={<IoTrashSharp />} onClick={disclosure.onOpen}>
        Delete user
      </MenuItem>

      <ModalDelete
        disclosure={disclosure}
        handleClick={handleClick}
        header="Are you sure you want to delete your account?"
      />
    </>
  );
}
