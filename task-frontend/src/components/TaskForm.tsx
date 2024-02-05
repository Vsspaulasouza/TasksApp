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
import { Select as AntdSelect, type SelectProps } from "antd";
import { Field, Formik } from "formik";
import { useRef } from "react";
import { CustomFormField } from ".";
import { type CategoriesIds, type CreatedCategory, type Task } from "../types";
import { postTaskValidation } from "../validations";

interface TaskFormProps {
  textButton: string;
  onSubmit: (task: Task) => Promise<void>;
  initialValues: Task;
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
  };
  categories: CreatedCategory[];
  title: string;
}

export function TaskForm({
  textButton,
  onSubmit,
  initialValues,
  disclosure,
  categories,
  title,
}: TaskFormProps) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { isOpen, onClose } = disclosure;

  const options: SelectProps["options"] = categories?.map((category) => {
    return { label: category.name, value: category.id };
  });

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
          {({ handleSubmit, errors, touched, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>{title}</ModalHeader>
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

                  <FormControl>
                    <FormLabel htmlFor="categories" fontWeight="bold">
                      Categories
                    </FormLabel>
                    <AntdSelect
                      id="categories"
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      size="large"
                      dropdownStyle={{ zIndex: 1450 }}
                      placeholder="Select categories"
                      options={options}
                      defaultValue={initialValues.categoriesIds}
                      onChange={(categoriesValues: CategoriesIds) => {
                        void (async () => {
                          await setFieldValue(
                            "categoriesIds",
                            categoriesValues
                          );
                        })();
                      }}
                    />
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
