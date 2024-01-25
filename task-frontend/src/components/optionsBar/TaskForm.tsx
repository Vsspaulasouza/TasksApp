import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useRef } from "react";
import { CustomFormField } from "..";
import { type Task } from "../../types";
import { postTaskValidation } from "../../validations";

interface TaskFormProps {
  textButton: string;
  onSubmit: (task: Task) => Promise<void>;
  initialValues: Task;
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
  };
}

export function TaskForm({
  textButton,
  onSubmit,
  initialValues,
  disclosure,
}: TaskFormProps) {
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
      <ModalContent>
        <Formik
          initialValues={initialValues}
          validationSchema={postTaskValidation}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>Create your task</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Stack spacing="6">
                  <CustomFormField
                    key="title"
                    fieldName="title"
                    error={errors.title}
                    isTouched={touched.title}
                    type="text"
                  />

                  <FormControl>
                    <FormLabel htmlFor="status" fontWeight="bold">
                      Status
                    </FormLabel>
                    <Field as={Select} id="status" name="status">
                      <option value="TODO">To do</option>
                      <option value="DOING">Doing</option>
                      <option value="DONE">Done</option>
                    </Field>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="priority" fontWeight="bold">
                      Priority
                    </FormLabel>
                    <Field as={Select} id="priority" name="priority">
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </Field>
                  </FormControl>
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
