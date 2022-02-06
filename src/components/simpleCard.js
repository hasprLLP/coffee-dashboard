import { Heading, Box, Text, Stack, Button, Avatar, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function SimpleCard({ name, heading, info, onEdit, id, data, onDetails, badge }) {
  const router = useRouter()

  return (
    <Box maxW={'240px'} w={'full'} mb={4} mr={4} bg={useColorModeValue('white', 'gray.800')} rounded={'xl'} overflow={'hidden'}>
      {badge && (
        <Box
          w={'full'}
          h={6}
          mt={4}
          mb={-4}
          justify={'center'}
          align={'center'}
          pos={'relative'}
          _after={{
            content: `"${badge}"`,
            w: 20,
            h: 6,
            fontSize: 10,
            lineHeight: 5,
            paddingLeft: 2,
            paddingRight: 2,
            fontWeight: 'bold',
            color: 'white',
            bg: badge === 'Stopped' ? 'red.400' : 'teal.400',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            left: 0,
            right: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      )}
      <Box p={6}>
        <Stack spacing={0} direction={'row'} justify={'center'} align={'center'} mb={5}>
          <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'} align={'center'}>
            {name}
          </Heading>
        </Stack>
        <Stack direction={'column'} justify={'center'} spacing={6}>
          <Stack spacing={0} align={'left'}>
            <Stack direction={'row'} justify={'space-between'} align={'center'}>
              <Text fontWeight={600}>{heading[0]}</Text>
              <Text fontSize={'sm'} color={'gray.500'} align={'right'}>
                {info[0] || 'Not Provided'}
              </Text>
            </Stack>
          </Stack>
          <Stack spacing={0} align={'left'}>
            <Stack direction={'row'} justify={'space-between'} align={'center'}>
              <Text fontWeight={600}>{heading[1]}</Text>
              <Text fontSize={'sm'} color={'gray.500'} align={'right'}>
                {info[1] || 'Not Provided'}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            onClick={() => onDetails(id, data)}
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
            onClick={() => onEdit(id, data)}
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
    </Box>
  )
}
