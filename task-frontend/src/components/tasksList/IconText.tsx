import { HStack, Text } from "@chakra-ui/react";
import { type IconType } from "react-icons";

interface IconTextProps {
  Icon: IconType;
  text: string;
  width?: string;
}

export function IconText({ Icon, text, width }: IconTextProps) {
  return (
    <HStack
      w={width === null ? "unset" : width}
      display={{ base: "none", md: "flex" }}
    >
      <Icon />
      <Text>{text}</Text>
    </HStack>
  );
}
