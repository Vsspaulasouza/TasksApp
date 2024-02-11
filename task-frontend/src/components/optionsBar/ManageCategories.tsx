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
import { type AxiosError } from "axios";
import { useRef } from "react";
import { IoPricetagOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { NoData } from "..";
import { getCategories } from "../../api";
import { isCustomError, type CreatedCategory } from "../../types";
import { showToast } from "../../utils";
import { CategoriesRender } from "./CategoriesRender";
import { CreateCategory } from "./CreateCategory";

export function ManageCategories() {
  const toast = useToast();
  const btnRef = useRef(null);
  const drawerDisclosure = useDisclosure();

  const { data } = useQuery<CreatedCategory[], AxiosError>({
    queryKey: "categories",
    queryFn: getCategories,
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        const { message } = error.response.data;
        showToast(toast, message, "error");
      }
    },
  });

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
            {data === undefined || data.length === 0 ? (
              <NoData text="No categories created" />
            ) : (
              <CategoriesRender categories={data} />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
