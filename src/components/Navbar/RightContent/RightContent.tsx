import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";

type Props = {
  /* user: any; */
};

const RightContent:React.FC<Props> = () => {
  return (
    <>
      {/* <AuthModal /> */}
      <Flex justify='center' align='center'>
        <AuthButtons />
      </Flex>
    </>
  );
};

export default RightContent;

