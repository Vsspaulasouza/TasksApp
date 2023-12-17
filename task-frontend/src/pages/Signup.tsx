import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Signup() {
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

        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "gray.700" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <form>
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="name" fontWeight="bold">
                    Name
                  </FormLabel>
                  <Input id="name" type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="username" fontWeight="bold">
                    Username
                  </FormLabel>
                  <Input id="username" type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password" fontWeight="bold">
                    Password
                  </FormLabel>
                  <Input id="password" type="password" />
                </FormControl>
              </Stack>
            </form>
            <Button bgColor="blue.600" _hover={{ bgColor: "blue.500" }}>
              Sign up
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default Signup;
