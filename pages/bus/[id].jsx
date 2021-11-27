//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import GoBack from "@/helpers/goback";
import UpdateButton from '@/components/updateButton';
import DeleteButton from '@/components/deleteButton';
import { useState } from 'react';
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function EditBus() {
  const router = useRouter();
  const { id } = router.query;
  const data = JSON.parse(router.query.data);

  const [busNumber, setBusNumber] = useState(data.busNumber);
  const [RCNumber, setRCNumber] = useState(data.RCNumber);
  const [name, setName] = useState(data.name);
  const [owner, setOwner] = useState(data.owner);
  const [capacity, setCapacity] = useState(data.capacity);

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: 'Bus No (RC)', placeholder: 'Provide RC No', value: busNumber, setter: setBusNumber },
    { title: 'Bus No ', placeholder: 'Provide', value: RCNumber, setter: setRCNumber },
    { title: 'Bus Name', placeholder: 'Enter a name for the bus', value: name, setter: setName },
    { title: 'Owner Name', placeholder: 'Bus Owner', value: owner, setter: setOwner },
    { title: 'Capacity', placeholder: 'Capacity Information', type: 'number', value: capacity, setter: setCapacity },
  ];

  // FIXME:className 'driver', 'driver-form' & 'driver-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='driver'>
        <div className='driver-title'><GoBack />Modify Bus Details</div>
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
