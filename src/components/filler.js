import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const Filler = ({ cards }) => {
  const N = cards;
  const arr = Array.from({ length: N }, (_, index) => index + 1);

  return (
    <>
      {arr.map((card, i) => {
        return (
          <Box key={i} padding="6" ml="3" w="20%" bg="white">
            <SkeletonCircle size="50" />
            <SkeletonText mt="4" noOfLines={10} spacing="4" />
          </Box>
        );
      })}
    </>
  );
};

export default Filler;
