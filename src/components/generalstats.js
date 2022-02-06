import { Box, Center, Text, Stack, List, ListItem, ListIcon, Button, useColorModeValue } from '@chakra-ui/react'
import { CheckIcon, WarningIcon } from '@chakra-ui/icons'

export default function Stats({ type, title, amount, amount2, line1, line2 }) {
  return (
    <Box maxW={'200px'} w={'full'} mb={3} mr={3} bg={'gray.100'} rounded={'xl'} overflow={'hidden'}>
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
          <Text fontSize={'lg'} fontWeight={400}>
            Pending : ₹500
          </Text>
        </Stack>
        <Stack direction={'row'} align={'center'} justify={'center'}>
          <Text fontSize={'lg'} fontWeight={400}>
            Pending : ₹500
          </Text>
        </Stack>
        <Stack direction={'row'} align={'center'} justify={'center'}>
          <Text fontSize={'lg'} fontWeight={400}>
            Pending : ₹500
          </Text>
        </Stack>
        <Stack direction={'row'} align={'center'} justify={'center'}>
          <Text fontSize={'lg'} fontWeight={400}>
            Pending : ₹500
          </Text>
        </Stack>
        <Stack direction={'row'} align={'center'} justify={'center'}>
          <Text fontSize={'lg'} fontWeight={400}>
            Pending : ₹500
          </Text>
        </Stack>
      </Stack>
    </Box>
  )
}
