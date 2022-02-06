import { Heading, Avatar, Box, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { EditIcon } from '@chakra-ui/icons'

export default function PhotoCard({ passenger, id, onEdit, onDetail, onFeeDetail }) {
  const router = useRouter()

  return (
    <Box maxW={'280px'} pos="relative" mb={6} mr={6} w={'full'} bg={useColorModeValue('white', 'gray.900')} rounded={'xl'} p={6} textAlign={'center'}>
      <Avatar
        size={'xl'}
        src={passenger?.photo?.url || '/static/svg/user.svg'}
        alt={'Avatar Alt'}
        mb={4}
        mt={4}
        pos={'relative'}
        _after={{
          content: `${!passenger?.isVerified ? '"Unverified"' : '"Verified"'}`,
          w: 'auto',
          h: 6,
          fontSize: 10,
          lineHeight: 5,
          textAlign: 'center',
          verticalAlign: 'middle',
          paddingLeft: 2,
          paddingRight: 2,
          fontWeight: 'bold',
          display: 'inline-block',
          color: 'white',
          bg: `${!passenger?.isVerified ? 'red.400' : 'teal.400'}`,
          border: '2px solid white',
          rounded: 'full',
          pos: 'absolute',
          top: -7,
        }}
      />
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {passenger.name}
      </Heading>
      <Text fontWeight={600} color={'gray.500'} mb={4}>
        Monthly Fee - ₹ {Math.round(passenger?.feePackage?.monthly) || 0}
      </Text>
      <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
        Route : {passenger?.route?.name || 'No Route'}
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
          Panel
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
  )
}
