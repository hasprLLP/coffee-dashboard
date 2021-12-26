import { Box, Avatar, Heading, Text, Stack, List, ListItem, ListIcon, Button, useColorModeValue } from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';

const VerifyStudent = ({ student, onButton }) => {
  return (
    <Box maxW={'98%'} w={'full'} h={'100%'} my={0.5} bg={useColorModeValue('white', 'gray.800')} rounded={'lg'} overflow={'hidden'}>
      <Stack direction={'row'} px={4} align={'center'} justify={'space-between'}>
        <Stack direction={'row'} align={'center'} justify={'space-between'}>
          <Avatar size={'md'} src={student.photo} alt={'Avatar Alt'} pos={'relative'} />
          <Stack direction={'column'} align={'flex-start'} justify={'space-between'} p={4}>
            <Stack direction={'row'} align={'center'} justify={'space-between'}>
              <Heading fontSize={'lg'} fontFamily={'Gilroy'}>
                {student.name}
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
                {student.isVerified ? 'Verified ' : 'Pending '}
                {student.route ? ` - ${student.route.name}` : ' - Route no available'}
              </Text>
            </Stack>
            <Heading fontSize={'sm'} fontWeight={500} color={'gray.500'} fontFamily={'Gilroy'}>
              {student?.school?.name}
            </Heading>
          </Stack>
        </Stack>
        <Button
          fontSize={'sm'}
          bg={'teal'}
          color={'white'}
          onClick={() => onButton(student.id, student)}
          boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
          _hover={{
            bg: 'teal.500',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          _focus={{
            bg: 'teal.500',
          }}
        >
          Assign Bus/Route
        </Button>
      </Stack>
    </Box>
  );
};
d
export default VerifyStudent;
