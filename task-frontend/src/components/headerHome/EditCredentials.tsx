import { useDisclosure, useToast } from "@chakra-ui/react";
import { IoLockClosed } from "react-icons/io5";
import { updateAuth } from "../../api";
import { isCustomError, type EditAuth } from "../../types";
import { showToast } from "../../utils";
import { editAuthValidation } from "../../validations";
import { ItemUserMenu } from "./ItemUserMenu";

export function EditCredentials() {
  const toast = useToast();

  const editAuthDisclosure = useDisclosure();

  const initialValuesAuth: EditAuth = {
    username: "",
    password: "",
  };

  const onSubmitEditAuth = async (values: EditAuth) => {
    if (values.username === "") delete values.username;
    if (values.password === "") delete values.password;
    const response = await updateAuth(values);

    if (response != null && isCustomError(response)) {
      const { message } = response;
      showToast(toast, message, "error");
    } else {
      showToast(toast, "Credentials updated", "success");
      editAuthDisclosure.onClose();
      location.reload();
    }
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
