import {
  Container,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { customRequestToken } from "../api";
import { CustomForm } from "../components";
import { isCustomError, type User } from "../types";
import { showToast } from "../utils";
import { signupValidation } from "../validations";

export function Signup() {
  const toast = useToast();
  const navigate = useNavigate();

  const initialValues: User = {
    name: "",
    username: "",
    password: "",
  };

  const onSubmit = async (values: User) => {
    const response = await customRequestToken("/auth/signup", values);

    if (response != null && isCustomError(response.data)) {
      const { message } = response.data;
      showToast(toast, message, "error");
    } else {
      navigate("/home");
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Image src="/tasks.svg" alt="Logo" maxW="50px" alignSelf="center" />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "2xl", md: "xl" }}>
              Create your account
            </Heading>
            <Text color="GrayText">
              Already have an account?{" "}
              <Link as={RouterLink} to="../login" color="teal">
                Log in
              </Link>
            </Text>
          </Stack>
        </Stack>

        <CustomForm
          initialValues={initialValues}
          validationSchema={signupValidation}
          onSubmit={onSubmit}
          textButton="Sign up"
        />
      </Stack>
    </Container>
  );
}
