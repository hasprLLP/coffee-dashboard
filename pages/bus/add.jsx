//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import SaveButton from '@/components/saveButton';
import { useState } from 'react';

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [name, setName] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [capacity, setCapacity] = useState(0);

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: 'Name', placeholder: 'Enter a name for the bus', value: name, setter: setName },
    { title: 'Number', placeholder: 'Bus Number', value: busNumber, setter: setBusNumber },
    { title: 'Capacity', placeholder: 'Passenger capacity', type: 'number', value: capacity, setter: setCapacity },
  ];

  // FIXME:className 'driver', 'driver-form' & 'driver-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='driver'>
        <div className='driver-title'>Add Bus</div>
        <div className='driver-form'>
          {fields.map((item, i) => {
            return <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />;
          })}
        </div>
        <SaveButton collection={'bus'} data={{ name, busNumber, capacity }} />
      </div>
    </div>
  );
}
