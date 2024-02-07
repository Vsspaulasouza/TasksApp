import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";

interface ModalDeleteProps {
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
  };
  header: string;
  handleClick: () => Promise<void>;
}

export function ModalDelete({
  disclosure,
  header,
  handleClick,
}: ModalDeleteProps) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { isOpen, onClose } = disclosure;

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent maxW={{ base: "95%", sm: "448px" }}>
        <ModalHeader>{header}</ModalHeader>
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
  );
}
