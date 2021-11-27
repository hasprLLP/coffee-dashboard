//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import DropDown from '@/components/dropdown';
import SaveButton from '@/components/saveButton';
import { useState } from 'react';

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [name, setName] = useState('');
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState();

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: 'School Name', placeholder: 'Enter School Name', value: name, setter: setName },
    { title: 'City', placeholder: 'City of the school', value: city, setter: setCity },
    { title: 'Address', placeholder: 'Address of the school', value: address, setter: setAddress },
    { title: 'Zip Code', type: 'number', placeholder: 'Enter Zip Code', value: zip, setter: setZip },
    { title: 'Phone', placeholder: 'School Contact Number', type: 'tel', prefix: '+91', value: phone, setter: setPhone },
    { title: 'Location', placeholder: 'Locate the School', value: location, setter: setLocation },
  ];

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
          collection={'school'}
          data={{
            name,
            city,
            address,
            zip,
            phone,
            location,
          }}
        />
      </div>
    </div>
  );
}
