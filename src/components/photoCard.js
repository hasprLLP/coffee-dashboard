import { Heading, Avatar, Box, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { EditIcon } from '@chakra-ui/icons';

export default function PhotoCard({ passenger, id, onEdit, onDetail, onFeeDetail }) {
  const router = useRouter();

  return (
    <Box maxW={'280px'} pos='relative' mb={6} mr={6} w={'full'} bg={useColorModeValue('white', 'gray.900')} rounded={'xl'} p={6} textAlign={'center'}>
      <Avatar
        size={'xl'}
        src={
          passenger.photo ||
          'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
        }
        alt={'Avatar Alt'}
        mb={4}
        pos={'relative'}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: 'green.300',
          border: '2px solid white',
          rounded: 'full',
          pos: 'absolute',
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {passenger.name}
      </Heading>
      <Text fontWeight={600} color={'gray.500'} mb={4}>
        Monthly Fee - ₹ {Math.round(passenger.lastTransaction.monthlyAmount)}
      </Text>
      <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
        {passenger.route.slug}
      </Text>

      <Stack mt={6} direction={'row'} spacing={4}>
        <Button
          flex={1}
          fontSize={'sm'}
          onClick={() => onDetail(id, passenger)}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          _focus={{
            bg: 'gray.200',
          }}
        >
          Reports
        </Button>
        <Button
          flex={1}
          fontSize={'sm'}
          bg={'teal'}
          color={'white'}
          onClick={() => onEdit(id, passenger)}
          boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
          _hover={{
            bg: 'red.400',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          _focus={{
            bg: 'red.400',
          }}
        >
          Edit
        </Button>
      </Stack>
    </Box>
  );
}
