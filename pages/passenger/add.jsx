//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import DropDown from '@/components/dropdown';
import FilePicker from '@/components/filepicker';
import SaveButton from '@/components/saveButton';
import { Switch } from '@chakra-ui/react';
import { useState, useRef } from 'react';

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [name, setName] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const [dob, setDob] = useState('');
  const [join, setJoin] = useState('');
  const [guardian, setGuardian] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [address, setAddress] = useState('');
  const [boarding, setBoarding] = useState('');
  const [classs, setClasss] = useState('');
  const [section, setSection] = useState('');
  const [school, setSchool] = useState('');
  const [bus, setBus] = useState('');
  const [route, setRoute] = useState('');
  const [fee, setFee] = useState('');
  const [photo, setPhoto] = useState('');

  //$ States and Hooks [#STATES#]
  const basicFields = [
    { title: 'Name', placeholder: 'Enter Passenger name', value: name, setter: setName },
    { title: 'Mobile', placeholder: 'Contact No', value: phone, setter: setPhone, type: 'tel', prefix: '+91' },
    { title: 'Upload Photo', value: photo, setter: setPhoto, type: 'upload' },
    { title: 'Date of Birth', type: 'date', placeholder: 'eg 02/07/2003', value: dob, setter: setDob },
    { title: 'Join Date', type: 'date', placeholder: 'eg 02/07/2003', value: join, setter: setJoin },
  ];

  const guardianDetails = [
    { title: 'Guardian Name', placeholder: 'Father/Mother etc', value: guardian, setter: setGuardian },
    { title: 'Guardian Mobile', placeholder: 'Parent Contact No', value: phone, setter: setPhone, type: 'tel', prefix: '+91' },
    { title: 'Guardian Landline (Optional)', placeholder: 'Guardian Landline no', value: phone2, setter: setPhone2, type: 'tel' },
    { title: 'Guardian Address', placeholder: 'Full Address', value: address, setter: setAddress },
  ];

  const boardingDetails = [
    { title: 'School', options: ['School Some', 'School More'], value: school, setter: setSchool, type: 'dropdown' },
    { title: 'Boarding Point', placeholder: 'Bus Boarding Point', value: boarding, setter: setBoarding },
    { title: 'Route', options: ['Route Some', 'Route More'], type: 'number', value: route, setter: setRoute, type: 'dropdown' },
  ];
  const feeDetails = [{ title: 'Monthly Fee', placeholder: 'Fee Monthly', type: 'number', value: fee, setter: setFee, prefix: '₹' }];

  // FIXME:className 'driver', 'driver-form' & 'driver-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='driver'>
        <div className='passenger-title'>Add Passenger</div>
        <div className='passenger-head'>
          <h1>Student ? </h1>
          <Switch
            onChange={(e) => {
              setIsStudent(e.target.checked);
            }}
            value={isStudent}
            size='md'
            defaultIsChecked={true}
          />
        </div>
        <div className='passenger-sub-title'>Basic Details</div>
        <div className='driver-form' style={{ justifyContent: 'flex-start' }}>
          {basicFields.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === 'upload' ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                type={item.type}
                key={i}
                title={item.title}
                placeholder={item.placeholder}
                value={item.value}
                setter={item.setter}
                prefix={item.prefix}
              />
            );
          })}
        </div>
        {isStudent ? (
          <>
            {' '}
            <div className='passenger-sub-title'>Guardian Details</div>
            <div className='driver-form' style={{ justifyContent: 'flex-start' }}>
              {guardianDetails.map((item, i) => {
                return item.type === 'dropdown' ? (
                  <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
                ) : item.type === 'upload' ? (
                  <FilePicker title={item.title} value={item.value} setter={item.setter} />
                ) : (
                  <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} prefix={item.prefix} />
                );
              })}
            </div>
          </>
        ) : null}
        <div className='passenger-sub-title'>Boarding Details</div>
        <div className='driver-form' style={{ justifyContent: 'flex-start' }}>
          {boardingDetails.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === 'upload' ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} prefix={item.prefix} />
            );
          })}
        </div>
        <div className='passenger-sub-title'>Fee Details</div>
        <div className='driver-form' style={{ justifyContent: 'flex-start' }}>
          {feeDetails.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === 'upload' ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} prefix={item.prefix} />
            );
          })}
        </div>
        <SaveButton
          collection={'bus'}
          // data={{ name, busNumber, capacity }}
        />
      </div>
    </div>
  );
}
