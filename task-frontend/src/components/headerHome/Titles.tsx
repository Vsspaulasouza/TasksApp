import { Heading, Highlight, Stack, Text } from "@chakra-ui/react";

export function Titles({ name }: { name: string | undefined }) {
  return (
    <Stack spacing={{ base: "3", sm: "1" }}>
      <Heading size="xl" mr="30px">
        Hello {name}, welcome to&nbsp;
        <Highlight
          query="Tasks"
          styles={{
            px: "2",
            py: "1",
            rounded: "full",
            bg: "teal.100",
            fontStyle: "italic",
          }}
        >
          Tasks
        </Highlight>
      </Heading>
      <Text fontSize="xl" color="GrayText">
        Your tasks are here!
      </Text>
    </Stack>
  );
}
