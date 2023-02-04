import AuthModal from "@/components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";

type Props = {
  user?: User | null;
};

const RightContent: React.FC<Props> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify='center' align='center'>
        {user ? (
          <Icons />
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};

export default RightContent;

