import { HStack, Text } from "@chakra-ui/react";
import { type IconType } from "react-icons";

interface IconTextProps {
  Icon: IconType;
  text: string;
}

export function IconText({ Icon, text }: IconTextProps) {
  return (
    <HStack>
      <Icon />
      <Text>{text}</Text>
    </HStack>
  );
}
