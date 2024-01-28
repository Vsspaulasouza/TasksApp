import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IoPricetagOutline, IoRadioButtonOnOutline } from "react-icons/io5";
import { getCategories } from "../../api";
import {
  isCreatedCategoryArray,
  isCustomError,
  type CreatedCategory,
} from "../../types";
import { showToast } from "../../utils";
import { CategoriesMenu } from "./CategoriesMenu";
import { CreateCategory } from "./CreateCategory";

export function ManageCategories() {
  const toast = useToast();
  const btnRef = useRef(null);
  const drawerDisclosure = useDisclosure();

  const [categories, setCategories] = useState<CreatedCategory[]>([]);

  useEffect(() => {
    const requestCategories = async () => {
      const response = await getCategories();

      if (response != null && isCustomError(response)) {
        const { message } = response;
        showToast(toast, message, "error");
      } else {
        if (isCreatedCategoryArray(response)) setCategories(response);
      }
    };

    void requestCategories();
  }, []);

  return (
    <>
      <Button
        onClick={drawerDisclosure.onOpen}
        variant="outline"
        leftIcon={<IoPricetagOutline />}
        ref={btnRef}
      >
        Manage categories
      </Button>
      <Drawer
        isOpen={drawerDisclosure.isOpen}
        placement="right"
        onClose={drawerDisclosure.onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Categories</DrawerHeader>

          <DrawerBody>
            <CreateCategory />
            <Flex
              mt="20px"
              justifyContent="space-between"
              alignItems="center"
              border="1px solid"
              borderTop="1px solid"
              borderTopRadius="6px"
              borderColor="gray.600"
              px={{ base: "1", md: "3" }}
              py={{ base: "1", md: "3" }}
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
                borderColor="gray.600"
                px={{ base: "1", md: "3" }}
                py={{ base: "1", md: "3" }}
              >
                <HStack spacing="5">
                  <Icon
                    as={IoRadioButtonOnOutline}
                    color={category.color}
                    w="39px"
                  />
                  <Text>{category.name}</Text>
                </HStack>
                <CategoriesMenu category={category} />
              </Flex>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
