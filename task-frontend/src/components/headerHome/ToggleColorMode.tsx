import { MenuItem, useColorMode } from "@chakra-ui/react";
import { IoMoon, IoSunny } from "react-icons/io5";

export function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <MenuItem
      icon={colorMode === "light" ? <IoMoon /> : <IoSunny />}
      onClick={toggleColorMode}
    >
      {colorMode === "light" ? "Dark " : "Light "} mode
    </MenuItem>
  );
}
