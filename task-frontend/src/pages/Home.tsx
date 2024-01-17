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
import { useEffect, useState } from "react";
import { IoLogOutOutline, IoPerson, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api";
import { isCustomError, isUser, type User } from "../types";
import { removeToken, showToast } from "../utils";

export function Home() {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const requestUser = async () => {
      const response = await getUser();

      if (response != null && isCustomError(response.data)) {
        showToast(toast, "Please log in to your account", "info");
        navigate("/auth/login");
      }

      if (isUser(response)) setUser(response);
    };

    void requestUser();
  }, []);

  const logout = () => {
    removeToken();
    navigate("/auth/login");
  };

  return (
    <Container
      maxW="100%"
      py={{ base: "12", md: "20" }}
      px={{ base: "0", sm: "20" }}
    >
      <Flex justifyContent="space-between">
        <Stack spacing="1">
          <Heading size={{ base: "2xl", md: "xl" }}>
            Hello {user?.name}, welcome to&nbsp;
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
              Tasks
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
            <MenuItem icon={<IoPerson />}>Edit user info</MenuItem>
            <MenuItem icon={<IoLogOutOutline />} onClick={logout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Container>
  );
}
