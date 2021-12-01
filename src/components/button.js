import { Button } from '@chakra-ui/react';

const BasicButton = ({ title, func }) => {
  return (
    <div className='button'>
      <Button colorScheme='teal' size='md'  onClick={func}>
        {title}
      </Button>
    </div>
  );
};

export default BasicButton;
