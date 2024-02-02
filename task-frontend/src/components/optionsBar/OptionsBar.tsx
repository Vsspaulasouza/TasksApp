import { HStack } from "@chakra-ui/react";
import { CreateTask } from "./CreateTask";
import { FilterTasks } from "./FilterTasks";
import { ManageCategories } from "./ManageCategories";

export function OptionsBar() {
  return (
    <HStack pt={{ base: "8", md: "10" }} pb={{ base: "3", md: "5" }}>
      <CreateTask />
      <ManageCategories />
      <FilterTasks />
    </HStack>
  );
}
