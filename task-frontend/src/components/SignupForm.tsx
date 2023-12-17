import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { signupValidation } from "../validations";

export function SignupForm() {
  return (
    <Box
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={{ base: "transparent", sm: "gray.700" }}
      boxShadow={{ base: "none", sm: "md" }}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      <Formik
        initialValues={{
          name: "",
          username: "",
          password: "",
        }}
        validationSchema={signupValidation}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl
                  isInvalid={errors.name !== undefined && touched.name}
                >
                  <FormLabel htmlFor="name" fontWeight="bold">
                    Name
                  </FormLabel>
                  <Field as={Input} id="name" name="name" type="text" />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.username !== undefined && touched.username}
                >
                  <FormLabel htmlFor="username" fontWeight="bold">
                    Username
                  </FormLabel>
                  <Field as={Input} id="username" name="username" type="text" />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.password !== undefined && touched.password}
                >
                  <FormLabel htmlFor="password" fontWeight="bold">
                    Password
                  </FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              </Stack>
              <Button
                type="submit"
                bgColor="blue.600"
                _hover={{ bgColor: "blue.500" }}
              >
                Sign up
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
}
