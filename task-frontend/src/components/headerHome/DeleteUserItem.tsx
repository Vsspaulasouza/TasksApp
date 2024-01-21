import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../api";
import { isCustomError } from "../../types";
import { showToast } from "../../utils";

export function DeleteUserItem() {
  const toast = useToast();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleClick = async () => {
    const response = await deleteUser();

    if (response != null && isCustomError(response)) {
      const { message } = response;
      showToast(toast, message, "error");
    } else {
      showToast(toast, "User deleted", "success");
      onClose();
      navigate("/auth/signup");
    }
  };

  return (
    <>
      <MenuItem icon={<IoTrashSharp />} onClick={onOpen}>
        Delete user
      </MenuItem>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to delete your account?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>This action cannot be undone</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                void handleClick();
              }}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
