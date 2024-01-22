import { Flex, Text } from "@chakra-ui/react";

export function TaskListBar() {
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
      <Text maxW="80%">Title</Text>
      <Flex maxW="15%" w="150px" justifyContent="space-between">
        <Text>Status</Text>
        <Text>Priority</Text>
      </Flex>
    </Flex>
  );
}
