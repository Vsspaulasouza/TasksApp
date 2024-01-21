import { Flex, Text } from "@chakra-ui/react";

interface TaskProps {
  type?: "first" | "normal";
}

export function Task({ type = "normal" }: TaskProps) {
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam consequatur facilis tenetur cum ducimus ipsam consequuntur laborum distinctio totam dolorum sit, sint quisquam harum voluptates cumque? Ipsam placeat excepturi cumque.";

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      border="1px solid"
      borderTop={type === "normal" ? "none" : "1px solid"}
      borderColor="gray.600"
      px={{ base: "3", md: "6" }}
      py={{ base: "1", md: "3" }}
    >
      <Text maxW="80%">{text}</Text>
      <Flex maxW="15%" w="150px" justifyContent="space-between">
        <Text>Status</Text>
        <Text>Priority</Text>
      </Flex>
    </Flex>
  );
}
