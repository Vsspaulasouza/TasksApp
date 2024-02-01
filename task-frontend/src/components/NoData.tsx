import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { Empty } from "antd";

interface NoDataProps {
  text: string;
}

export function NoData({ text }: NoDataProps) {
  const { colorMode } = useColorMode();

  return (
    <Flex justifyContent="center" alignItems="center">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <Text color={colorMode === "dark" ? "#EDEEEE" : "#2D3753"}>
            {text}
          </Text>
        }
        style={{
          width: "300px",
          height: "300px",
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "7px",
          backgroundColor: colorMode === "light" ? "#F6F6F6" : "unset",
        }}
      />
    </Flex>
  );
}
