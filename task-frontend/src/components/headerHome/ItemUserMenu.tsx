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
  Stack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useRef } from "react";
import { type IconType } from "react-icons";
import { CustomFormField } from "..";

interface ItemUserMenuProps {
  name: string;
  Icon: IconType;
  buttonText: string;
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  initialValues: object;
  validationSchema: object;
  onSubmit: (values: any) => Promise<void>;
}

export function ItemUserMenu({
  name,
  Icon,
  buttonText,
  disclosure,
  initialValues,
  validationSchema,
  onSubmit,
}: ItemUserMenuProps) {
  const { isOpen, onOpen, onClose } = disclosure;

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const fields = Object.keys(initialValues) as Array<
    keyof typeof initialValues
  >;

  return (
    <>
      <MenuItem icon={<Icon />} onClick={onOpen}>
        {name}
      </MenuItem>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW={{ base: "95%", sm: "448px" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader>{name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Stack spacing="6">
                    {fields.map((field) => (
                      <CustomFormField
                        key={field}
                        fieldName={field}
                        error={errors[field]}
                        isTouched={touched[field]}
                        type={field}
                      />
                    ))}
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} type="submit">
                    {buttonText}
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
