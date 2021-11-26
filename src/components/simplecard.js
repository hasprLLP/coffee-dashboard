import { Heading, Box, Text, Stack, Button, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function SimpleCard({ name, school, start, end, type }) {

  const router = useRouter();

  const viewDetails = () => {
    router.push({
      pathname: `${type}/1`,
    });
  }

  return (
    <Box maxW={"240px"} w={"full"} mb={4} mr={4} bg={useColorModeValue("white", "gray.800")} rounded={"xl"} overflow={"hidden"}>
      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          <Heading fontSize={"xl"} fontWeight={500} fontFamily={"body"} align={"center"}>
            {name}
          </Heading>
          <Text color={"gray.500"}>{school}</Text>
        </Stack>
        <Stack direction={"row"} justify={"center"} spacing={6}>
          <Stack spacing={0} align={"left"}>
            <Text fontWeight={600}>{type === 'bus' ? "School" : "Start"}</Text>
            <Text fontSize={"sm"} color={"gray.500"} align={"left"}>
              {start}
            </Text>
          </Stack>
          <Stack spacing={0} align={"end"}>
            <Text fontWeight={600}>{type === 'bus' ? "Route" : "Destination"}</Text>
            <Text fontSize={"sm"} color={"gray.500"} align={"end"}>
              {end}
            </Text>
          </Stack>
        </Stack>

        <Button
          w={"full"}
          mt={8}
          bg={"teal"}
          color={"white"}
          rounded={"md"}
          onClick={viewDetails}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
        >
          View Details
        </Button>
      </Box>
    </Box>
  );
}
