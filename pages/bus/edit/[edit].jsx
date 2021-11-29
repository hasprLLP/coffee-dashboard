//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import GoBack from '@/helpers/goback';
import DropDown from '@/components/dropdown';
import UpdateButton from '@/components/updateButton';
import DeleteButton from '@/components/deleteButton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function EditBus() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();

  const [RCNumber, setRCNumber] = useState();
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [ownerPhone, setOwnerPhone] = useState();
  const [capacity, setCapacity] = useState();
  const [vehicleType, setVehicleType] = useState();

  useEffect(() => {
    if (router?.query?.data) {
      setData(JSON.parse(router.query.data));
      setRCNumber(data?.RCNumber);
      setName(data?.name);
      setOwner(data?.owner?.name);
      setOwnerPhone(data?.owner?.phone);
      setCapacity(data?.capacity);
      setVehicleType(data?.vehicleType);
    }
  }, [router.query.data, data]);
  //$ States and Hooks [#STATES#]
  const fields = [
    { title: 'Bus Name (or ID)', isRequired: true, placeholder: 'Bus Name for Reference', value: name, setter: setName },
    { title: 'Bus No (RC)', isRequired: true, placeholder: 'Provide Registration No', value: RCNumber, setter: setRCNumber },
    { title: 'Owner Name', placeholder: 'Bus Owner Name', value: owner, setter: setOwner },
    { title: 'Owner Phone', placeholder: 'Bus Owner Phone', value: ownerPhone, setter: setOwnerPhone },
    { title: 'Capacity', placeholder: 'Bus Seating Capacity', type: 'number', value: capacity, setter: setCapacity },
    { title: 'Vehicle Type', options: ['Bus', 'Mini-Bus', 'Van'], value: vehicleType, setter: setVehicleType, type: 'dropdown' },
  ];

  // FIXME:className 'driver', 'layout-form' & 'layout-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='home-shift'>
        <div className='layout-title'>
          <GoBack />
          Modify Bus Details
        </div>
        <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
          {fields.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                type={item.type}
                key={i}
                title={item.title}
                placeholder={item.placeholder}
                value={item.value}
                setter={item.setter}
                prefix={item.prefix}
                isRequired={item.isRequired}
              />
            );
          })}
        </div>
        <div className='layout-edit-row'>
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
