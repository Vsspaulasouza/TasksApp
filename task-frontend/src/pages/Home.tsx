import {
  Container,
  Flex,
  Heading,
  Highlight,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api";
import { isCustomError } from "../types";
import { showToast } from "../utils";

export function Home() {
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const requestUser = async () => {
      const response = await getUser();

      if (response != null && isCustomError(response.data)) {
        showToast(toast, "Please log in to your account", "info");
        navigate("/auth/login");
      }
    };

    void requestUser();
  }, []);

  return (
    <Container
      maxW="100%"
      py={{ base: "12", md: "20" }}
      px={{ base: "0", sm: "20" }}
    >
      <Flex justifyContent="space-between">
        <Stack spacing="1">
          <Heading size={{ base: "2xl", md: "xl" }}>
            <Highlight
              query="Tasks"
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "teal.100",
                fontStyle: "italic",
              }}
            >
              Hello, welcome to Tasks
            </Highlight>
          </Heading>
          <Text fontSize="xl" color="GrayText">
            Your tasks are here!
          </Text>
        </Stack>

        <Menu>
          <MenuButton
            as={IconButton}
            isRound={true}
            icon={<IoSettingsOutline />}
            aria-label="User settings"
            fontSize="20px"
          />
          <MenuList>
            <MenuItem>Edit user info</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Container>
  );
}
