import { Divider } from "react-native-elements";
import CFlex from "./CFlex";
import Container from "./Container";
import { LayoutComponentProps, SizeableProps } from "./types";
import Border, { BorderProps, BorderSolidBlack } from "./Border";
import Devider from "./Devider";
import { Box, Flex, Text } from "@react-native-material/core";
import { View } from "react-native";

export type PageSplitterProps = {
  rows: React.JSX.Element[];
};

export default function PageSplitter(
  props: LayoutComponentProps<PageSplitterProps>,
) {
  return (
    <Flex style={{ flexDirection: "row" }} h="100%" w="100%" fill>
      {props.rows.map((element, index: number) => {
        return (
          <>
            <View key={index}>
              <PageSplitterRow {...element.props} />
            </View>
            {index < props.rows.length - 1 ? (
              <Devider
                color="blue"
                size={5}
                mode="vertical"
                style={{
                  height: "100%",
                }}
              ></Devider>
            ) : (
              <></>
            )}
          </>
        );
      })}
    </Flex>
  );
}

export type PageSpliiterRowProps = {
  minWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  maxWidth?: number;
  fill?: boolean;

  // setted by PageSplitter
} & SizeableProps;

export function PageSplitterRow(
  props: LayoutComponentProps<PageSpliiterRowProps>,
) {
  if (props.fill !== undefined && props.fill !== false) {
    return (
      <Flex grow={1} h="100%" style={{ backgroundColor: "green" }}>
        {props.children}
      </Flex>
    );
  }
  return (
    <Box w={props.width} h="100%" style={{ backgroundColor: "green" }}>
      {props.children}
    </Box>
  );
}
