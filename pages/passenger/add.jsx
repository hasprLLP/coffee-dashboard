//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import DropDown from '@/components/dropdown';
import FilePicker from '@/components/filepicker';
import SaveButton from '@/components/saveButton';
import { Switch } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import server from '@/functions/server';

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [name, setName] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const [DOB, setDOB] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [guardian, setGuardian] = useState('');
  const [phone, setPhone] = useState();
  const [landline, setLandline] = useState();
  const [guardianPhone, setGuardianPhone] = useState();
  const [address, setAddress] = useState('');
  const [guardianAddress, setGuardianAddress] = useState('');
  const [location, setLocation] = useState('');
  const [schools, setSchools] = useState('');
  const [school, setSchool] = useState('');
  const [routes, setRoutes] = useState();
  const [route, setRoute] = useState();
  const [fee, setFee] = useState('');
  const [photo, setPhoto] = useState('');
  const [bus, setBus] = useState();
  const [cls, setCls] = useState('');
  const [section, setSection] = useState('');

  const [schoolNames, setSchoolNames] = useState([]);
  const [routeNames, setRouteNames] = useState([]);

  const setSchoolID = (name) => {
    // get the object with name = school from array of schools
    const schoolObj = schools?.find((school) => school.name === name);
    setSchool(schoolObj.id);
  };
  const setRouteID = (name) => {
    // get the object with name = school from array of schools
    const routeObj = routes?.find((bus) => bus.name === name);
    setRoute(routeObj.id);
  };

  //$ States and Hooks [#STATES#]
  const basicFields = [
    { title: 'Name', placeholder: 'Enter Passenger name', value: name, setter: setName },
    { title: 'Mobile', placeholder: 'Contact No', value: phone, setter: setPhone, type: 'tel', prefix: '+91' },
    { title: 'Upload Photo', value: photo, setter: setPhoto, type: 'upload' },
    { title: 'Date of Birth', type: 'date', placeholder: 'eg 02/07/2003', value: DOB, setter: setDOB },
    { title: 'Join Date', type: 'date', placeholder: 'eg 02/07/2003', value: joiningDate, setter: setJoiningDate },
  ];

  const guardianDetails = [
    { title: 'Guardian Name', placeholder: 'Father/Mother etc', value: guardian, setter: setGuardian },
    { title: 'Guardian Mobile', placeholder: 'Parent Contact No', value: guardianPhone, setter: setGuardianPhone, type: 'tel', prefix: '+91' },
    { title: 'Guardian Landline (Optional)', placeholder: 'Guardian Landline no', value: landline, setter: setLandline, type: 'tel' },
    { title: 'Guardian Address', placeholder: 'Full Address', value: guardianAddress, setter: setGuardianAddress },
  ];

  const boardingDetails = [
    { title: 'School', options: schoolNames, value: school?.name, setter: setSchoolID, type: 'dropdown' },
    { title: 'Address', placeholder: 'Address', value: address, setter: setAddress },
    { title: 'Route', options: routeNames, type: 'number', value: route?.name, setter: setRouteID, type: 'dropdown' },
  ];
  const feeDetails = [{ title: 'Monthly Fee', placeholder: 'Fee Monthly', type: 'number', value: fee, setter: setFee, prefix: '₹' }];

  const getSchool = async () => {
    try {
      const response = await server.get(`${process.env.SERVER_URL}school/`);
      setSchools(response.data.data);
      const tempSchoolName = [];
      response.data.data.map((school) => {
        tempSchoolName.push(school.name);
      });
      setSchoolNames(tempSchoolName);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getRoutes = async () => {
    try {
      const response = await server.get(`${process.env.SERVER_URL}route${school ? `?school=${school}` : ''}`);
      setRoutes(response.data.data);
      const tempSchoolName = [];
      response.data.data.map((school) => {
        tempSchoolName.push(school.name);
      });
      setRouteNames(tempSchoolName);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getSchool();
  }, []);
  useEffect(() => {
    getRoutes();
  }, [school]);

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
          collection={'admin/passenger'}
          data={{
            name,
            phone,
            photo,
            DOB,
            joiningDate,
            guardian: {
              name: guardian,
              phone: guardianPhone,
              landline: landline,
              address: guardianAddress,
            },
            route,
            location: {
              type: 'Point',
              coordinates: [23.861998, 78.803366],
              address: 'MIG 71, Gour Nagar , Makronia , Sagar',
            },
            fee,
            isStudent,
          }}
        />
      </div>
    </div>
  );
}
