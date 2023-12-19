import { Box, Button, Stack } from "@chakra-ui/react";
import { Formik, type FormikHelpers } from "formik";
import { type ObjectSchema } from "yup";
import { CustomFormField } from ".";
import { type LoginType, type User } from "../types";

interface FormProps {
  initialValues: User | LoginType;
  validationSchema: ObjectSchema<User | LoginType>;
  onSubmit:
    | ((
        values: User | LoginType,
        formikHelpers: FormikHelpers<User | LoginType>
      ) => undefined | Promise<any>)
    | ((values: any) => void);
  textButton: string;
}

export function CustomForm({
  initialValues,
  validationSchema,
  onSubmit,
  textButton,
}: FormProps) {
  const fields = Object.keys(initialValues) as Array<
    keyof typeof initialValues
  >;

  return (
    <Box
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={{ base: "transparent", sm: "gray.700" }}
      boxShadow={{ base: "none", sm: "md" }}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing="6">
              <Stack spacing="5">
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
              <Button
                type="submit"
                bgColor="blue.600"
                _hover={{ bgColor: "blue.500" }}
              >
                {textButton}
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
}
