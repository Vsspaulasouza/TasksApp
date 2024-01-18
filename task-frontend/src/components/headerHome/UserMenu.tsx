import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoLogOutOutline, IoPerson, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CustomForm } from "..";
import { updateUser } from "../../api";
import { isCustomError, type User } from "../../types";
import { removeToken, showToast } from "../../utils";
import { signupValidation } from "../../validations";

export function UserMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const navigate = useNavigate();
  const toast = useToast();

  const logout = () => {
    removeToken();
    navigate("/auth/login");
  };

  const initialValues: User = {
    name: "",
    username: "",
    password: "",
  };

  const onSubmit = async (values: User) => {
    const name = { name: values.name };
    const authCredentials = {
      username: values.username,
      password: values.password,
    };

    const response = await updateUser(name, authCredentials);

    if (response != null && isCustomError(response)) {
      const { message } = response;
      showToast(toast, message, "error");
    } else {
      onClose();
      location.reload();
    }
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        isRound={true}
        icon={<IoSettingsOutline />}
        aria-label="User settings"
        fontSize="20px"
      />
      <MenuList>
        <MenuItem icon={<IoPerson />} onClick={onOpen}>
          Edit user info
        </MenuItem>
        <MenuItem icon={<IoLogOutOutline />} onClick={logout}>
          Logout
        </MenuItem>
      </MenuList>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit user info</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CustomForm
              initialValues={initialValues}
              validationSchema={signupValidation}
              onSubmit={onSubmit}
              textButton="Edit"
              withoutBox
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Menu>
  );
}
