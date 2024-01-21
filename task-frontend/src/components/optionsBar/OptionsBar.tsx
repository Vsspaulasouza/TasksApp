import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useRef } from "react";
import { IoAddOutline } from "react-icons/io5";
import { CustomFormField } from "..";
import { postTask } from "../../api";
import { isCustomError, type Task } from "../../types";
import { showToast } from "../../utils";
import { postTaskValidation } from "../../validations";

export function OptionsBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const toast = useToast();

  const initialValues: Task = { title: "", status: "TODO", priority: "LOW" };

  const onSubmit = async (task: Task) => {
    const response = await postTask(task);

    if (response != null && isCustomError(response)) {
      const { message } = response;
      showToast(toast, message, "error");
    } else {
      onClose();
      location.reload();
    }
  };

  return (
    <HStack pt={{ base: "8", md: "10" }} pb={{ base: "3", md: "5" }}>
      <Button onClick={onOpen} variant="outline" leftIcon={<IoAddOutline />}>
        Create task
      </Button>

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
                    Create
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </HStack>
  );
}
