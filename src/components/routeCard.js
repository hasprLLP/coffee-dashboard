import { Heading, Box, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { EditIcon } from '@chakra-ui/icons';

export default function RouteCard({ route, onEdit, onDetails, id }) {
  const router = useRouter();

  return (
    <Box maxW={'240px'} w={'full'} mb={4} mr={4} bg={useColorModeValue('white', 'gray.800')} rounded={'xl'} overflow={'hidden'}>
      <Box p={6}>
        <Stack spacing={0} direction={'row'} justify={'space-between'} align={'center'} mb={5}>
          <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'} align={'center'}>
            {route.name}
          </Heading>
          <EditIcon onClick={() => onEdit(id, route)} />
        </Stack>
        <Stack direction={'column'} justify={'center'} spacing={6}>
          <Stack spacing={0} align={'left'}>
            <Stack direction={'row'} justify={'space-between'} align={'end'}>
              <Text fontWeight={600}>Bus</Text>
              <Text fontSize={'sm'} color={'gray.500'} align={'left'}>
                {route.bus.name}
              </Text>
            </Stack>
          </Stack>
          <Stack spacing={0} align={'left'}>
            <Stack direction={'row'} justify={'space-between'} align={'end'}>
              <Text fontWeight={600}>School</Text>
              <Text fontSize={'sm'} color={'gray.500'} align={'left'}>
                {route.school.name}
              </Text>
            </Stack>
          </Stack>
        </Stack>

        <Button
          w={'full'}
          mt={8}
          bg={'teal'}
          color={'white'}
          rounded={'md'}
          onClick={() => onDetails(id, route)}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
        >
          View Details
        </Button>
      </Box>
    </Box>
  );
}
