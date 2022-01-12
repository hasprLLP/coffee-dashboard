import { Box, Avatar, Heading, Text, Stack, List, ListItem, ListIcon, Button, useColorModeValue } from '@chakra-ui/react'
import { CheckIcon, WarningIcon } from '@chakra-ui/icons'

const GeneralCard = ({}) => {
  return (
    <Box
      maxW={'310px'}
      w={'full'}
      h={'100%'}
      my={1}
      mr={3}
      bg={'gray.200'}
      rounded={'lg'}
      overflow={'hidden'}
      onClick={() => alert("open bus panel")}
      _hover={{
        cursor: 'pointer',
        bg: 'gray.400',
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      _focus={{
        bg: 'gray.600',
        cursor: 'pointer',
      }}
    >
      <Stack direction={'row'} pl={4} align={'center'} justify={'space-between'}>
        <Stack direction={'row'} align={'center'} justify={'space-between'}>
          <Avatar size={'md'} src={'/static/svg/bus.svg'} alt={'Avatar Alt'} pos={'relative'} />
          <Stack direction={'column'} align={'flex-start'} justify={'space-between'} p={4}>
            <Stack direction={'row'} align={'center'} justify={'space-between'}>
              <Heading fontSize={'md'} fontFamily={'Gilroy'}>
                Bus Name
              </Heading>
              <Text fontSize={'xs'} fontFamily={'Gilroy'} fontWeight={600} bg={'white'} px={3} py={0.5} color={'teal'} rounded={'full'}>
                58 Passengers
              </Text>
            </Stack>
            <Heading fontSize={'sm'} fontWeight={500} color={'gray.600'} fontFamily={'Gilroy'}>
              Redeem : ₹500
            </Heading>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default GeneralCard
