import { Box, Avatar, Heading, Text, Stack, List, ListItem, ListIcon, Button, useColorModeValue } from '@chakra-ui/react'
import { CheckIcon, WarningIcon } from '@chakra-ui/icons'

const CollectFee = ({ item }) => {
  return (
    <Box maxW={'98%'} w={'full'} h={'100%'} my={0.5} bg={useColorModeValue('white', 'gray.800')} rounded={'lg'} overflow={'hidden'}>
      <Stack direction={'row'} px={4} align={'center'} justify={'space-between'}>
        <Stack direction={'row'} align={'center'} justify={'space-between'}>
          <Avatar
            size={'md'}
            src={
              item?.passenger?.photo?.url || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
            }
            alt={'Avatar Alt'}
            pos={'relative'}
          />
          <Stack direction={'column'} align={'flex-start'} justify={'space-between'} p={4}>
            <Stack direction={'row'} align={'center'} justify={'space-between'}>
              <Heading fontSize={'lg'} fontFamily={'Gilroy'}>
                {item?.passenger?.name} - {item?.passenger?.passengerID}
              </Heading>
              <Text
                fontSize={'xs'}
                fontFamily={'Gilroy'}
                fontWeight={600}
                bg={useColorModeValue('teal.50', 'teal.900')}
                px={3}
                py={0.5}
                color={'teal.500'}
                rounded={'full'}
              >
                {item?.bill?.data?.name} - {item?.pack?.toUpperCase()}
              </Text>
              <Text
                fontSize={'xs'}
                fontFamily={'Gilroy'}
                fontWeight={600}
                bg={useColorModeValue('teal.50', 'teal.900')}
                px={3}
                py={0.5}
                color={'teal.500'}
                rounded={'full'}
              >
                {item?.bill?.data?.payDate?.substring(0, 10)}
              </Text>
            </Stack>
            <Heading fontSize={'med'} fontWeight={500} fontFamily={'Gilroy'}>
              <b>₹{item?.bill?.total}</b> paid using Offline Mode
            </Heading>
            <Heading fontSize={'sm'} fontWeight={500} fontFamily={'Gilroy'}>
              Amount : <b>₹{item?.bill?.amount}</b>
              &nbsp;&nbsp;CLF : <b>₹{item?.bill?.clfAmount || 0}</b> with Due Date <b>{item?.bill?.data?.dueDate?.substring(0, 10)}</b>
            </Heading>
          </Stack>
        </Stack>
        <Button
          fontSize={'sm'}
          colorScheme="red"
          color={'white'}
          onClick={() => onEdit(id, passenger)}
          _hover={{
            bg: 'teal.500',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          _focus={{
            bg: 'teal.500',
          }}
        >
          Verify Payment
        </Button>
      </Stack>
    </Box>
  )
}

export default CollectFee
