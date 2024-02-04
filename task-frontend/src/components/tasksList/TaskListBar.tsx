import { Button, Flex, HStack } from "@chakra-ui/react";
import { IoArrowDown, IoArrowUp, IoSwapVertical } from "react-icons/io5";
import {
  isOrder,
  isOrderAtribute,
  type Order,
  type OrderTasksAction,
  type OrderTasksState,
} from "../../types";

interface TaskListBarProps {
  orderTasksState: OrderTasksState;
  orderTasksDispatch: React.Dispatch<OrderTasksAction>;
}

export function TaskListBar({
  orderTasksState,
  orderTasksDispatch,
}: TaskListBarProps) {
  const icons = {
    initial: <IoSwapVertical />,
    ascending: <IoArrowDown />,
    descending: <IoArrowUp />,
  };

  const changeOrder = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { value } = currentTarget;

    if (isOrderAtribute(value)) {
      let newOrder: Order = "initial";
      const currentOrder = orderTasksState[value];

      if (isOrder(currentOrder)) {
        switch (currentOrder) {
          case "initial":
            newOrder = "ascending";
            break;
          case "ascending":
            newOrder = "descending";
            break;
        }
      }

      orderTasksDispatch({ atribute: value, order: newOrder });
    }
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      border="1px solid"
      borderTop="1px solid"
      borderTopRadius="6px"
      borderColor="gray.600"
      px={{ base: "3", md: "6" }}
      py={{ base: "1", md: "3" }}
    >
      <Button
        value="title"
        variant="ghost"
        rightIcon={icons[orderTasksState.title]}
        onClick={changeOrder}
      >
        Title
      </Button>
      <HStack spacing="23px" mr="60px">
        <Button
          value="status"
          variant="ghost"
          rightIcon={icons[orderTasksState.status]}
          onClick={changeOrder}
        >
          Status
        </Button>
        <Button
          value="priority"
          variant="ghost"
          rightIcon={icons[orderTasksState.priority]}
          onClick={changeOrder}
        >
          Priority
        </Button>
      </HStack>
    </Flex>
  );
}
