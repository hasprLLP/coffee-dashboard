import { Heading, Avatar, Box, Text, Stack, Button, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function PhotoCard({ photo, name, fee, details }) {

  const router = useRouter();

  const viewDetails = () => {
    router.push({
      pathname: "/student/1",
    });
  }

  return (
    <Box
      maxW={"280px"}
      mb={6}
      mr={6}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      rounded={"xl"}
      p={6}
      textAlign={"center"}
    >
      <Avatar
        size={"xl"}
        src={photo}
        alt={"Avatar Alt"}
        mb={4}
        pos={"relative"}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: "green.300",
          border: "2px solid white",
          rounded: "full",
          pos: "absolute",
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={"2xl"} fontFamily={"body"}>
        {name}
      </Heading>
      <Text fontWeight={600} color={"gray.500"} mb={4}>
      Monthly Fee - ₹ {fee}
      </Text>
      <Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}>
       {details}
      </Text>

      <Stack mt={6} direction={"row"} spacing={4}>
        <Button
          flex={1}
          fontSize={"sm"}
          onClick={viewDetails}
          _focus={{
            bg: "gray.200",
          }}
        >
          View Details
        </Button>
        <Button
          flex={1}
          fontSize={"sm"}
  
          bg={"teal"}
          color={"white"}
          boxShadow={"0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"}
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
        >
          Fee Report
        </Button>
      </Stack>
    </Box>
  );
}
