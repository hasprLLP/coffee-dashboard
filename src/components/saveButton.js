import { Button } from '@chakra-ui/react';
import Notification from '@/components/notification';
import axios from 'axios';
import { useState } from 'react';
import server from 'src/functions/server';

const SaveButton = ({ collection, data, reset }) => {
  const [status, setStatus] = useState(null);

  const onSave = async () => {
    try {
      const response = await server.post(`${process.env.SERVER_URL}${collection}/`, data);
      console.log('response', response);
      if (response.status === 201) {
        setStatus('success');
        reset.map(setter => setter(""));
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };
  return (
    <div className='button'>
      <Button onClick={onSave} colorScheme='teal' size='md' isFullWidth>
        Save
      </Button>
      <Notification type={status} />
    </div>
  );
};

export default SaveButton;
