import { Button } from '@chakra-ui/react';
import Notification from '@/components/notification';
import { useState } from 'react';
import server from 'src/backend/node/server';

const UpdateButton = ({ collection, data }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const onUpdate = async () => {
    setLoading(true);

    try {
      const response = await server.patch(`${process.env.SERVER_URL}${collection}/`, data);
      if (response.status === 201) {
        setStatus('success');
        setLoading(false);
      } else {
        setStatus('error');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setStatus('error');
      setLoading(false);
    }
  };
  return (
    <div className='button'>
      <Button onClick={onUpdate} colorScheme='teal' size='md' isFullWidth>
        Update
      </Button>
      <Notification type={status} />
    </div>
  );
};

export default UpdateButton;
