import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IoPricetagOutline } from "react-icons/io5";
import { NoData } from "..";
import { getCategories } from "../../api";
import {
  isCreatedCategoryArray,
  isCustomError,
  type CreatedCategory,
} from "../../types";
import { showToast } from "../../utils";
import { CategoriesRender } from "./CategoriesRender";
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
            {categories.length === 0 ? (
              <NoData text="No categories created" />
            ) : (
              <CategoriesRender categories={categories} />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
