import { extendTheme } from "@chakra-ui/react";

const extension = {
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
};

export const myTheme = extendTheme(extension);
