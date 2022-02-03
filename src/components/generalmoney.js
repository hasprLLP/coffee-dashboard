import { Box, Center, Text, Stack, List, ListItem, ListIcon, Button, useColorModeValue } from '@chakra-ui/react'
import { CheckIcon, WarningIcon } from '@chakra-ui/icons'

export default function Pricing({ type, title, amount,amount2,line1,line2 }) {
  return (
    <Box maxW={'240px'} w={'full'} mb={3} mr={3} bg={'gray.100'} rounded={'xl'} overflow={'hidden'}>
      <Stack textAlign={'center'} p={4} color={useColorModeValue('gray.800', 'white')} align={'center'}>
        <Text
          fontSize={'sm'}
          fontWeight={500}
          bg={useColorModeValue(`${type}.100`, `${type}.900`)}
          p={2}
          px={3}
          color={`${type}.500`}
          rounded={'full'}
        >
          {title}
        </Text>
        <Stack direction={'row'} align={'center'} justify={'center'}>
          <Text fontSize={'3xl'}>₹</Text>
          <Text fontSize={'6xl'} fontWeight={800}>
            {Math.round(amount)||0}
          </Text>
          <Text color={'gray.500'}></Text>
        </Stack>
        <Stack direction={'row'} align={'center'} justify={'center'}>
          <Text fontSize={'xl'}>₹</Text>
          <Text fontSize={'xl'} fontWeight={800}>
            {Math.round(amount2)||0} Discount
          </Text>
          <Text color={'gray.500'}></Text>
        </Stack>
      </Stack>

      <Box bg={'gray.300'} px={6} py={6}>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={type !== 'green' ? WarningIcon : CheckIcon} color={`${type}.400`} />
            {line1}
          </ListItem>
          <ListItem>
            <ListIcon as={type !== 'green' ? WarningIcon : CheckIcon} color={`${type}.400`} />
            {line2}
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}
