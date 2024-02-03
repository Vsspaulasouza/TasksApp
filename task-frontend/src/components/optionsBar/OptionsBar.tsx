import { HStack } from "@chakra-ui/react";
import { type FilterTasksAction } from "../../types";
import { CreateTask } from "./CreateTask";
import { FilterTasks } from "./FilterTasks";
import { ManageCategories } from "./ManageCategories";

interface OptionsBarProps {
  filterTasksDispatch: React.Dispatch<FilterTasksAction>;
}

export function OptionsBar({ filterTasksDispatch }: OptionsBarProps) {
  return (
    <HStack pt={{ base: "8", md: "10" }} pb={{ base: "3", md: "5" }}>
      <CreateTask />
      <ManageCategories />
      <FilterTasks filterTasksDispatch={filterTasksDispatch} />
    </HStack>
  );
}
