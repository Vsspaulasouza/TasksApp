import { Container, Heading, Image, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { SignupForm } from "../components";

export function Signup() {
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
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>

        <SignupForm />
      </Stack>
    </Container>
  );
}
