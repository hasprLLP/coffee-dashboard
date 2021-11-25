import { Button } from '@chakra-ui/react';
import axios from 'axios';
axios.defaults.withCredentials = true;
const SaveButton = ({ collection, data }) => {
  const onSave = async () => {
    const response = await axios.post(`${process.env.SERVER_URL}${collection}`, data);
    console.log('response', response);
    if (response.status === 201) {
      alert('saved');
    } else {
      alert('Not Saved');
    }
  };
  return (
    <div className='button'>
      <Button onClick={onSave} colorScheme='teal' size='md' isFullWidth>
        Save
      </Button>
    </div>
  );
};

export default SaveButton;
