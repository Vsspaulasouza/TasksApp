import { Flex, HStack, Icon, Text, useColorMode } from "@chakra-ui/react";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { type CreatedCategory } from "../../types";
import { CategoriesMenu } from "./CategoriesMenu";

interface CategoriesRenderProps {
  categories: CreatedCategory[];
}

export function CategoriesRender({ categories }: CategoriesRenderProps) {
  const { colorMode } = useColorMode();

  return (
    <>
      <Flex
        mt="20px"
        justifyContent="space-between"
        alignItems="center"
        border="1px solid"
        borderTop="1px solid"
        borderTopRadius="6px"
        borderColor={colorMode === "light" ? "#e2e8f0" : "whiteAlpha.300"}
        p="3"
      >
        <HStack spacing="5" mr="90px">
          <Text w="39px" textAlign="center">
            Color
          </Text>
          <Text>Name</Text>
        </HStack>
      </Flex>

      {categories.map((category) => (
        <Flex
          key={category.id}
          justifyContent="space-between"
          alignItems="center"
          border="1px solid"
          borderTop="none"
          borderColor={colorMode === "light" ? "#e2e8f0" : "whiteAlpha.300"}
          p="3"
        >
          <HStack spacing="5">
            <Icon as={IoRadioButtonOnOutline} color={category.color} w="39px" />
            <Text>{category.name}</Text>
          </HStack>
          <CategoriesMenu category={category} />
        </Flex>
      ))}
    </>
  );
}
