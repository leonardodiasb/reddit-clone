import AuthModal from "@/components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import AuthButtons from "./AuthButtons";

type Props = {
  user: any;
};

const RightContent: React.FC<Props> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify='center' align='center'>
        {user ? <Button onClick={() => signOut(auth)}>Logout</Button> : <AuthButtons />}
      </Flex>
    </>
  );
};

export default RightContent;

