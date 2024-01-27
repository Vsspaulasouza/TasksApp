import { Flex, HStack, Text } from "@chakra-ui/react";

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
      <Text maxW="75%">Title</Text>
      <HStack spacing="50px" mr="90px">
        <Text w="66px" textAlign="center">
          Status
        </Text>
        <Text w="82px" textAlign="center">
          Priority
        </Text>
      </HStack>
    </Flex>
  );
}
