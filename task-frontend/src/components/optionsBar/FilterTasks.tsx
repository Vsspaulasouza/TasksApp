import {
  Button,
  Checkbox,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoFilter } from "react-icons/io5";
import { type Priority, type Status } from "../../types";
import { formatCapitalizeLower } from "../../utils";

export function FilterTasks() {
  const statusOptions: Status[] = ["TODO", "DOING", "DONE"] as const;
  const priorityOptions: Priority[] = ["LOW", "MEDIUM", "HIGH"] as const;

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = target;

    console.log(value, checked);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" leftIcon={<IoFilter />}>
          Filter tasks
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Stack spacing="5">
            <Stack>
              <Text>Status</Text>
              <HStack spacing="3">
                {statusOptions.map((option) => (
                  <Checkbox key={option} value={option} onChange={onChange}>
                    {formatCapitalizeLower(option)}
                  </Checkbox>
                ))}
              </HStack>
            </Stack>

            <Stack>
              <Text>Priority</Text>
              <HStack spacing="3">
                {priorityOptions.map((option) => (
                  <Checkbox key={option} value={option} onChange={onChange}>
                    {formatCapitalizeLower(option)}
                  </Checkbox>
                ))}
              </HStack>
            </Stack>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
