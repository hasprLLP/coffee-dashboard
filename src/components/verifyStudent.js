import { Box, Avatar, Heading, Text, Stack, List, ListItem, ListIcon, Button, useColorModeValue } from "@chakra-ui/react";
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";

const VerifyStudent = () => {
  return (
    <Box maxW={"98%"} w={"full"} h={"100%"} my={0.5} bg={useColorModeValue("white", "gray.800")} rounded={"lg"} overflow={"hidden"}>
      <Stack direction={"row"} px={4} align={"center"} justify={"space-between"}>
        <Stack direction={"row"} align={"center"} justify={"space-between"}>
          <Avatar
            size={"md"}
            src={
              "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            alt={"Avatar Alt"}
            pos={"relative"}
          />
          <Stack direction={"column"} align={"flex-start"} justify={"space-between"} p={4}>
            <Stack direction={"row"} align={"center"} justify={"space-between"}>
              <Heading fontSize={"lg"} fontFamily={"Gilroy"}>
                Abhay Rohit
              </Heading>
              <Text
                fontSize={"xs"}
                fontFamily={"Gilroy"}
                fontWeight={600}
                bg={useColorModeValue("teal.50", "teal.900")}
                px={3}
                py={0.5}
                color={"teal.500"}
                rounded={"full"}
              >
                Verified
              </Text>
            </Stack>
            <Heading fontSize={"sm"} fontWeight={500} color={"gray.500"} fontFamily={"Gilroy"}>
              Makronia to DMA Bus
            </Heading>
          </Stack>
        </Stack>
        <Button
          fontSize={"sm"}
          bg={"teal"}
          color={"white"}
          onClick={() => onEdit(id, passenger)}
          boxShadow={"0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"}
          _hover={{
            bg: "teal.500",
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
          _focus={{
            bg: "teal.500",
          }}
        >
          Assign Bus
        </Button>
      </Stack>
    </Box>
  );
};

export default VerifyStudent;
