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
      <Flex maxW="15%" w="200px" justifyContent="space-between">
        <Text w="66px" textAlign="center">
          Status
        </Text>
        <Text w="82px" textAlign="center">
          Priority
        </Text>
      </Flex>
    </Flex>
  );
}
