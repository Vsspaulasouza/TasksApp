import { useDisclosure, useToast } from "@chakra-ui/react";
import { type AxiosError } from "axios";
import { IoPerson } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import { requestApi } from "../../api";
import {
  isCustomError,
  type CreatedUser,
  type EditNameUser,
  type NameUser,
} from "../../types";
import { showToast } from "../../utils";
import { editNameValidation } from "../../validations";
import { ItemUserMenu } from "./ItemUserMenu";

export function EditUserInfo() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const editNameDisclosure = useDisclosure();

  const initialValuesName: NameUser = {
    name: "",
  };

  const { mutate: editUser } = useMutation<
    CreatedUser,
    AxiosError,
    EditNameUser
  >({
    mutationKey: "user",
    mutationFn: async (data) => {
      return await requestApi({
        method: "patch",
        urlPath: "users/me",
        data,
      });
    },
    onSuccess: () => {
      editNameDisclosure.onClose();
      showToast(toast, "User name updated", "success");
      void queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        const { message } = error.response.data;
        showToast(toast, message, "error");
      }
    },
  });

  const onSubmitEditName = async (editData: NameUser) => {
    editUser(editData);
  };

  return (
    <ItemUserMenu
      name="Edit user info"
      Icon={IoPerson}
      buttonText="Edit"
      disclosure={editNameDisclosure}
      initialValues={initialValuesName}
      validationSchema={editNameValidation}
      onSubmit={onSubmitEditName}
    />
  );
}
