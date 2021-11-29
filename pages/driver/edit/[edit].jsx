//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import DropDown from '@/components/dropdown';
import FilePicker from '@/components/filepicker';
import UpdateButton from '@/components/updateButton';
import DeleteButton from '@/components/deleteButton';
import GoBack from '@/helpers/goback';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function EditBus() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();

  useEffect(() => {
    router.query.data ? setData(JSON.parse(router.query.data)) : null;
    setName(data?.name);
    setPhone(data?.phone);
    setPin(data?.pin);
  }, [router.query.data, data]);

  const [name, setName] = useState();

  const [phone, setPhone] = useState();
  const [pin, setPin] = useState();

  const [photo, setPhoto] = useState('');
  const [sign, setSign] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: 'Driver Name', isRequired: true, placeholder: 'Bus Operator Name', value: name, setter: setName },

    {
      title: 'Mobile No',
      isRequired: true,
      placeholder: 'Operator Phone no',
      type: 'number',
      value: phone,
      setter: setPhone,
      type: 'tel',
      prefix: '+91',
    },
    { title: 'Pin', placeholder: 'Pin', value: pin, setter: setPin },

    { title: 'Upload Passport Photo', value: photo, setter: setPhoto, type: 'upload' },
    { title: 'Upload Signature', value: sign, setter: setSign, type: 'upload' },
    { title: 'Upload Driving License', value: drivingLicense, setter: setDrivingLicense, type: 'upload' },
  ];

  // FIXME:className 'driver', 'layout-form' & 'layout-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='home-shift'>
        <div className='layout-title'>
          <GoBack />
          Modify Driver Details
        </div>
        <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
          {fields.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === 'upload' ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                key={i}
                isRequired={item.isRequired}
                title={item.title}
                placeholder={item.placeholder}
                value={item.value}
                setter={item.setter}
                prefix={item.prefix}
                type={item.type}
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
