//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import SaveButton from '@/components/button';
import { useState } from 'react';

//& Create & Export Driver [#FUNCTION#]
export default function AddRoute() {
  const [id, setId] = useState('');
  const [name, setName] = useState('')
  const [start, setStart] = useState('');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState(false);
  const [photo, setPhoto] = useState('');

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: 'Route ID', placeholder: 'Please enter unique ID', value: id, setter: setId },
    { title: 'Route Name', placeholder: 'Route Name', value: name, setter: setName },
    { title: 'Starting Point', placeholder: 'Bus starts from', value: start, setter: setStart },
    { title: 'School Name', placeholder: 'Bus Destination', value: school, setter: setSchool },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='driver'>
        <div className='driver-title'>Add Route</div>
        <div className='driver-form'>
          {fields.map((item, i) => {
            return <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />;
          })}
        </div>
        <SaveButton />
      </div>
    </div>
  );
}
