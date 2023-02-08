import React, { useState } from "react";
import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import { Flex, MenuItem, Icon } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";

type CommunitiesProps = {

};

const Communities:React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)}/>
      <MenuItem 
        width='100%' 
        fontSize='10pt' 
        _hover={{ bg: "gray.100" }} 
        onClick={() => setOpen(true)}
      >
        <Flex align='center'>
          <Icon as={GrAdd} mr={2} fontSize={20} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;

