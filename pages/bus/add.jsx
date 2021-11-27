//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import DropDown from '@/components/dropdown';
import SaveButton from '@/components/saveButton';
import { useState } from 'react';
//import server from '@/functions/server';

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [busNumber, setBusNumber] = useState('');
  const [RCNumber, setRCNumber] = useState();
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [capacity, setCapacity] = useState(8);

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: 'Bus No (RC)', placeholder: 'Provide RC No', value: busNumber, setter: setBusNumber },
    { title: 'Bus No ', placeholder: 'Provide', value: RCNumber, setter: setRCNumber },
    { title: 'Bus Name', placeholder: 'Enter a name for the bus', value: name, setter: setName },
    { title: 'Owner Name', placeholder: 'Bus Owner', value: owner, setter: setOwner },
    { title: 'Capacity', placeholder: 'Capacity Information', type: 'number', value: capacity, setter: setCapacity },
  ];

  // const save = () => {
  //   server('/bus', {
  //     method: 'POST',
  //     body: {
  //       busNumber,
  //       RCNumber,
  //       name,
  //       owner,
  //       capacity,
  //     },
  //   });
  // };
  // FIXME:className 'driver', 'driver-form' & 'driver-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='driver'>
        <div className='driver-title'>Add Bus</div>
        <div className='driver-form' style={{ justifyContent: 'flex-start' }}>
          {fields.map((item, i) => {
            return <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />;
          })}
        </div>
        <SaveButton
          collection={'bus'}
          data={{
            busNumber,
            RCNumber,
            name,
            owner,
            capacity,
          }}
        />
      </div>
    </div>
  );
}
