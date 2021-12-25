//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import GoBack from '@/helpers/goback';
import DropDown from '@/components/dropdown';
import UpdateButton from '@/components/updateButton';
import DeleteButton from '@/components/deleteButton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Switch } from '@chakra-ui/react';

//& Create & Export Driver [#FUNCTION#]
export default function EditBus() {
  const router = useRouter();
  const { id } = router.query;

  const [RCNumber, setRCNumber] = useState();
  const [name, setName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [capacity, setCapacity] = useState(60);
  const [commission, setCommission] = useState(10);
  const [vehicleType, setVehicleType] = useState('Bus');
  const [selfOwn, setSelfOwn] = useState();

  useEffect(() => {
    if (router.query.data) {
      const data = JSON.parse(router.query.data);
      setName(data?.name);
      setOwnerPhone(data?.owner?.phone);
      setCapacity(data?.capacity);
      setVehicleType(data?.vehicleType);
      setCommission(data?.commission);
      setSelfOwn(data?.selfOwn);
      setOwnerName(data?.owner?.name);
      setRCNumber(data?.RCNumber);
    }
  }, [router.query.data]);

  //$ States and Hooks [#STATES#]
  const basicFields = [
    { title: 'Bus Name (or ID)', isRequired: true, placeholder: 'Bus Name for Reference', value: name, setter: setName },
    { title: 'Bus No (RC)', isRequired: true, placeholder: 'Provide Registration No', value: RCNumber, setter: setRCNumber },

    { title: 'Capacity', placeholder: 'Bus Seating Capacity', type: 'number', value: capacity, setter: setCapacity },
    { title: 'Commission', type: 'fix', placeholder: 'Owner Commission', value: commission, setter: setCommission },
    { title: 'Vehicle Type', options: ['Bus', 'Mini-Bus', 'Van'], value: vehicleType, setter: setVehicleType, type: 'dropdown' },
  ];
  const ownerFields = [
    { title: 'Owner Name', type: 'fix', placeholder: 'Bus Owner Name', value: ownerName, setter: setOwnerName },
    { title: 'Owner Phone', type: 'fix', placeholder: 'Bus Owner Phone', value: ownerPhone, setter: setOwnerPhone },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='home-shift'>
        <div className='layout-title'>
          <GoBack />
          Modify Bus Details
        </div>
        <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
          {basicFields.map((item, i) => {
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
          {!selfOwn
            ? ownerFields.map((item, i) => {
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
              })
            : null}
        </div>

        <div className='layout-edit-row'>
          <UpdateButton collection={`bus/${id}`} data={{ name, RCNumber, capacity, vehicleType }} />
          <DeleteButton
            collection={'bus'}
            // data={{ name, busNumber, capacity }}
          />
        </div>
      </div>
    </div>
  );
}
