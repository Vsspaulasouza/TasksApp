import { Container, Heading, Image, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { CustomForm } from "../components";
import { type User } from "../types";
import { loginValidation } from "../validations";

export function Login() {
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
              Login your account
            </Heading>
            <Text color="GrayText">
              Don&apos;t have an account?{" "}
              <Link as={RouterLink} to="../signup" color="teal">
                Sign up
              </Link>
            </Text>
          </Stack>
        </Stack>

        <CustomForm
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={loginValidation}
          onSubmit={(values: User) => {
            console.log(values);
          }}
          textButton="Login"
        />
      </Stack>
    </Container>
  );
}
