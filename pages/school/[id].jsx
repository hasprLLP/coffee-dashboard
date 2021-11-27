//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import DropDown from '@/components/dropdown';
import UpdateButton from '@/components/updateButton';
import DeleteButton from '@/components/deleteButton';
import { useState } from 'react';
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function EditSchool() {
  const router = useRouter();
  const { id } = router.query;
  const data = JSON.parse(router.query.data);

  const [name, setName] = useState(data.name);
  const [city, setCity] = useState(data.city);
  const [address, setAddress] = useState(data.address);
  const [zip, setZip] = useState(data.zip);
  const [phone, setPhone] = useState(data.phone);
  const [location, setLocation] = useState(data.location);

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
        <div className='driver-title'>Modify Bus Details</div>
        <div className='driver-form' style={{ justifyContent: 'flex-start' }}>
          {fields.map((item, i) => {
            return <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />;
          })}
        </div>
        <div className='driver-edit-row'>
          <UpdateButton
            collection={'bus'}
            // data={{ name, busNumber, capacity }}
          />
          <DeleteButton
            collection={'bus'}
            // data={{ name, busNumber, capacity }}
          />
        </div>
      </div>
    </div>
  );
}
