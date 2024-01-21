import { useDisclosure, useToast } from "@chakra-ui/react";
import { IoPerson } from "react-icons/io5";
import { updateName } from "../../api";
import { isCustomError, type NameUser } from "../../types";
import { showToast } from "../../utils";
import { editNameValidation } from "../../validations";
import { ItemUserMenu } from "./ItemUserMenu";

export function EditUserInfo() {
  const toast = useToast();

  const editNameDisclosure = useDisclosure();

  const initialValuesName: NameUser = {
    name: "",
  };

  const onSubmitEditName = async (values: NameUser) => {
    const response = await updateName(values);

    if (response != null && isCustomError(response)) {
      const { message } = response;
      showToast(toast, message, "error");
    } else {
      showToast(toast, "User info updated", "success");
      editNameDisclosure.onClose();
      location.reload();
    }
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
