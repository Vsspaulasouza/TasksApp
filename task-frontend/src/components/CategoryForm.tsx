import {
  Button,
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
import { CustomFormField } from ".";
import { type Category } from "../types";
import { postCategoryValidation } from "../validations";

interface CategoryFormProps {
  textButton: string;
  onSubmit: (task: Category) => Promise<void>;
  initialValues: Category;
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
  };
  title: string;
}

export function CategoryForm({
  textButton,
  onSubmit,
  initialValues,
  disclosure,
  title,
}: CategoryFormProps) {
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
        <Formik
          initialValues={initialValues}
          validationSchema={postCategoryValidation}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Stack spacing="6">
                  <CustomFormField
                    key="name"
                    fieldName="name"
                    error={errors.name}
                    isTouched={touched.name}
                    type="text"
                  />

                  <CustomFormField
                    key="color"
                    fieldName="color"
                    error={errors.color}
                    isTouched={touched.color}
                    type="color"
                    width="50px"
                    padding="1"
                    cursor="pointer"
                  />
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  {textButton}
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
