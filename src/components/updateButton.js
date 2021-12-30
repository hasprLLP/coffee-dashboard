import { Button } from '@chakra-ui/react';
import Notification from '@/components/notification';
import { useState } from 'react';
import axios from 'axios';

const UpdateButton = ({ collection, data }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const onUpdate = async () => {
    setLoading(true);

    try {
      const response = await axios.patch(`${collection}/`, data);
      console.log(response.status);
      if (response.status === 201) {
        setStatus('success');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setStatus(error?.response?.data?.message);
      console.log(error?.response);
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
