import {
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
} from "@chakra-ui/react";
import { IoLogOutOutline, IoPerson, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { type CreatedUser } from "../types";
import { removeToken } from "../utils";

interface HeaderHomeProps {
  user: CreatedUser | null;
}

export function HeaderHome({ user }: HeaderHomeProps) {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/auth/login");
  };

  return (
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
  );
}
