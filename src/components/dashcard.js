import { Box, Center, Text, Stack, List, ListItem, ListIcon, Button, useColorModeValue } from "@chakra-ui/react";
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";

const DashCard = ({ title, no }) => {
  return (
    <Box maxW={"240px"} w={"full"} mr={3} mb={3} bg={useColorModeValue("white", "gray.800")} rounded={"lg"} overflow={"hidden"}>
      <Stack textAlign={"center"} p={4} color={useColorModeValue("gray.800", "white")} align={"center"}>
        <Stack direction={"row"} align={"center"} justify={"center"}>
          <Text fontSize={"md"} fontWeight={500} bg={useColorModeValue("teal.50", "teal.900")} p={2} color={"teal.500"} rounded={"full"}>
            {title}
          </Text>
          <Text fontSize={"4xl"} fontWeight={800} pl={10}>
            {no}
          </Text>
        </Stack>
      </Stack>

      <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={6}>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.400" />
            75 Bus Assigned
          </ListItem>
          <ListItem>
            <ListIcon as={WarningIcon} color="red.400" />4 Pending Verification
          </ListItem>
        </List>

        <Button
          mt={4}
          w={"full"}
          bg={"gray.300"}
          color={"white"}
          rounded={"md"}
          _hover={{
            bg: "teal.500",
          }}
          _focus={{
            bg: "teal.500",
          }}
        >
          View Detailed
        </Button>
      </Box>
    </Box>
  );
};

export default DashCard;
