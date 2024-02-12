import { useDisclosure, useToast } from "@chakra-ui/react";
import { type AxiosError } from "axios";
import { IoLockClosed } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import { requestApi } from "../../api";
import { isCustomError, type CreatedUser, type EditAuth } from "../../types";
import { showToast } from "../../utils";
import { editAuthValidation } from "../../validations";
import { ItemUserMenu } from "./ItemUserMenu";

export function EditCredentials() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const editAuthDisclosure = useDisclosure();

  const initialValuesAuth: EditAuth = {
    username: "",
    password: "",
  };

  const { mutate } = useMutation<CreatedUser, AxiosError, EditAuth>({
    mutationKey: "user",
    mutationFn: async (data) => {
      return await requestApi({
        method: "patch",
        urlPath: "auth/me",
        data,
      });
    },
    onSuccess: () => {
      editAuthDisclosure.onClose();
      showToast(toast, "Credentials updated", "success");
      void queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        const { message } = error.response.data;
        showToast(toast, message, "error");
      }
    },
  });

  const onSubmitEditAuth = async (editData: EditAuth) => {
    if (editData.username === "") delete editData.username;
    if (editData.password === "") delete editData.password;

    mutate(editData);
  };

  return (
    <ItemUserMenu
      name="Edit credentials"
      Icon={IoLockClosed}
      buttonText="Edit"
      disclosure={editAuthDisclosure}
      initialValues={initialValuesAuth}
      validationSchema={editAuthValidation}
      onSubmit={onSubmitEditAuth}
    />
  );
}
