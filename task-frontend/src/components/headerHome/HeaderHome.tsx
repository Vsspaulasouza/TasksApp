import { Flex } from "@chakra-ui/react";
import { type CreatedUser } from "../../types";
import { Titles } from "./Titles";
import { UserMenu } from "./UserMenu";

interface HeaderHomeProps {
  user: CreatedUser | null;
}

export function HeaderHome({ user }: HeaderHomeProps) {
  return (
    <Flex justifyContent="space-between">
      <Titles name={user?.name} />
      <UserMenu />
    </Flex>
  );
}
