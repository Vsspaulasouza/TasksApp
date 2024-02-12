import { MenuItem, useDisclosure, useToast } from "@chakra-ui/react";
import { type AxiosError } from "axios";
import { IoTrashSharp } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ModalDelete } from "..";
import { requestApi } from "../../api";
import { isCustomError, type CreatedUser } from "../../types";
import { showToast } from "../../utils";

export function DeleteUserItem() {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const disclosure = useDisclosure();

  const { mutate } = useMutation<CreatedUser, AxiosError>({
    mutationKey: "user",
    mutationFn: async () => {
      return await requestApi({
        method: "delete",
        urlPath: "users/me",
      });
    },
    onSuccess: () => {
      showToast(toast, "User deleted", "success");
      disclosure.onClose();
      void queryClient.invalidateQueries("user");
      navigate("/auth/signup");
    },
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        const { message } = error.response.data;
        showToast(toast, message, "error");
      }
    },
  });

  const handleClick = async () => {
    mutate();
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
