import { HStack } from "@chakra-ui/react";
import { CreateCategory } from "./CreateCategory";
import { CreateTask } from "./CreateTask";

export function OptionsBar() {
  return (
    <HStack pt={{ base: "8", md: "10" }} pb={{ base: "3", md: "5" }}>
      <CreateTask />
      <CreateCategory />
    </HStack>
  );
}
