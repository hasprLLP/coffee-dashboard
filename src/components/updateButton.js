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
      if (response.status === 202) {
        setStatus('success');
        setLoading(false);
      } else if(response.status === 204){
        setStatus('error');
        setLoading(false);
      }else {
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
