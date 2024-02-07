import { Flex } from "@chakra-ui/react";
import { type FilterTasksAction } from "../../types";
import { CreateTask } from "./CreateTask";
import { FilterTasks } from "./FilterTasks";
import { ManageCategories } from "./ManageCategories";

interface OptionsBarProps {
  filterTasksDispatch: React.Dispatch<FilterTasksAction>;
}

export function OptionsBar({ filterTasksDispatch }: OptionsBarProps) {
  return (
    <Flex
      pt={{ base: "6", sm: "10" }}
      pb={{ base: "5", sm: "5" }}
      flexWrap="wrap"
      gap="2"
    >
      <CreateTask />
      <ManageCategories />
      <FilterTasks filterTasksDispatch={filterTasksDispatch} />
    </Flex>
  );
}
