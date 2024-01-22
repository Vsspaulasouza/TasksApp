import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoLogOutOutline, IoOptionsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils";
import { DeleteUserItem } from "./DeleteUserItem";
import { EditCredentials } from "./EditCredentials";
import { EditUserInfo } from "./EditUserInfo";

export function UserMenu() {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/auth/login");
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        isRound={true}
        icon={<IoOptionsOutline />}
        aria-label="User settings"
        fontSize="20px"
      />
      <MenuList>
        <EditUserInfo />
        <EditCredentials />
        <DeleteUserItem />
        <MenuDivider />
        <MenuItem icon={<IoLogOutOutline />} onClick={logout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
