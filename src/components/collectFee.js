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
              'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
            alt={'Avatar Alt'}
            pos={'relative'}
          />
          <Stack direction={'column'} align={'flex-start'} justify={'space-between'} p={4}>
            <Stack direction={'row'} align={'center'} justify={'space-between'}>
              <Heading fontSize={'lg'} fontFamily={'Gilroy'}>
                Abhay Rohit
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
                Gold Pack - 3 Months
              </Text>
            </Stack>
            <Heading fontSize={'sm'} fontWeight={500} fontFamily={'Gilroy'}>
              <b>₹8547</b> paid using Offline Mode
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
