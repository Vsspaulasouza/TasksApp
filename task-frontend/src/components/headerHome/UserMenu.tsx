import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoLogOutOutline, IoPerson, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils";

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
  );
}
