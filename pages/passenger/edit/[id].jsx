//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import DropDown from '@/components/dropdown';
import FilePicker from '@/components/filepicker';
import UpdateButton from '@/components/updateButton';
import DeleteButton from '@/components/deleteButton';
import GoBack from '@/helpers/goback';
import { Switch } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

//& Create & Export Driver [#FUNCTION#]
export default function EditPassenger() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [isStudent, setIsStudent] = useState(true);
  const [DOB, setDOB] = useState();
  const [joiningDate, setJoiningDate] = useState();
  const [dueDate, setDueDate] = useState();
  const [guardian, setGuardian] = useState();
  const [phone, setPhone] = useState();
  const [landline, setLandline] = useState();
  const [address, setAddress] = useState();
  const [location, setLocation] = useState();
  const [school, setSchool] = useState({});
  const [schools, setSchools] = useState([]);
  const [schoolNames, setSchoolNames] = useState([]);
  const [route, setRoute] = useState({});
  const [routes, setRoutes] = useState([]);
  const [routeNames, setRouteNames] = useState([]);
  const [photo, setPhoto] = useState();
  const [amount, setAmount] = useState();
  const [cls, setCls] = useState();

  useEffect(() => {
    if (router.query.data) {
      const data = JSON.parse(router.query.data);
      const DOB = data?.DOB?.split('T') || '';
      const joiningDate = data?.joiningDate?.split('T') || '';
      const dueDate = data?.dueDate.split('T') || '';

      setIsStudent(data?.isStudent);
      setDOB(DOB[0]);
      setName(data?.name);
      setJoiningDate(joiningDate[0]);
      setLocation(data?.location);
      setDueDate(dueDate[0]);
      setGuardian(data?.guardian?.name);
      setPhone(data?.user?.phone);
      setLandline(data?.user?.whatsapp);
      setAddress(data?.location?.address);
      setSchool(data?.school);
      setRoute(data?.route);
      setPhoto(data?.photo);
      setAmount(data?.lastTransaction?.amount);
      setCls(data?.cls);
    }
  }, [router.query.data]);

  const getSchools = async () => {
    try {
      const response = await axios.get(`school/`);
      setSchools(response.data.data);
      const tempSchoolNames = [];
      response.data.data.map((school) => {
        tempSchoolNames.push(school.name);
      });
      setSchoolNames(tempSchoolNames);
    } catch (error) {
      console.log('School Error', error);
    }
  };
  const getRoutes = async () => {
    try {
      const response = await axios.get(`route${school.id ? `?school=${school?.id}` : ''}`);
      setRoutes(response.data.data);
      const tempRoutesName = [];
      response.data.data.map((route) => {
        tempRoutesName.push(route.name);
      });
      setRouteNames(tempRoutesName);
    } catch (error) {
      console.log('error', error);
    }
  };

  const setSchoolID = (schoolName) => {
    const schoolObj = schools?.find((school) => school?.name === schoolName);
    setSchool(schoolObj);
  };
  const setRouteID = (routeName) => {
    const routeObj = routes?.find((route) => route?.name === routeName);
    setRoute(routeObj);
  };

  useEffect(() => {
    getSchools();
  }, []);

  useEffect(() => {
    getRoutes();
  }, [school]);

  //$ States and Hooks [#STATES#]
  const basicFields = [
    { title: 'Name', isRequired: true, placeholder: 'Enter Passenger name', value: name, setter: setName },

    { title: 'Upload Photo', value: photo, setter: setPhoto, type: 'upload' },
    { title: 'Date of Birth', type: 'date', placeholder: 'eg 02/07/2003', value: DOB, setter: setDOB },
  ];

  const guardianDetails = [
    { title: 'Guardian Name', isRequired: true, placeholder: 'Father/Mother etc', value: guardian, setter: setGuardian },
    {
      title: 'Guardian Mobile',
      isRequired: true,
      placeholder: 'Parent Contact No',
      value: phone,
      setter: setPhone,
      type: 'tel',
      prefix: '+91',
    },
    { title: ' Landline (Optional)', placeholder: ' Landline no', value: landline, setter: setLandline, type: 'tel' },
  ];

  const boardingDetails = [
    { title: 'Full Address', type: 'fix', placeholder: 'Boarding Point Address', value: address, setter: setAddress },
    { title: 'School', fix: school?.name && 'fix', options: schoolNames, value: school?.name, setter: setSchoolID, type: 'dropdown' },
    { title: 'Route', fix: route?.name && 'fix', options: routeNames, type: 'number', value: route?.name, setter: setRouteID, type: 'dropdown' },
  ];
  const feeDetails = [
    { title: 'Joining Date', type: 'date', placeholder: 'eg 02/07/2003', value: joiningDate, setter: setJoiningDate },
    { title: 'Due Date', type: 'date', placeholder: 'eg 02/07/2003', value: dueDate, setter: setDueDate },
    { title: 'Fee Amount', placeholder: 'Fee for Selected Duration', type: 'number', value: amount, setter: setAmount, prefix: '₹' },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='home-shift'>
        <div className='layout-title'>
          <GoBack />
          Edit {isStudent ? 'Student' : 'Teacher'}
        </div>
        <div className='layout-sub-title'>{isStudent ? 'Student' : 'Teacher'} Details</div>
        <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
          {!isStudent ? (
            <TextField type={'tel'} title={'Mobile'} placeholder={'Contact No'} value={phone} setter={setPhone} prefix={'+91'} isRequired={true} />
          ) : null}
          {basicFields.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} type={item.type} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === 'upload' ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                key={i}
                type={item.type}
                title={item.title}
                placeholder={item.placeholder}
                value={item.value}
                setter={item.setter}
                prefix={item.prefix}
                isRequired={item.isRequired}
              />
            );
          })}
          {!isStudent ? (
            <TextField type={'tel'} title={'Landline (Optional)'} placeholder={'Landline no'} value={landline} setter={setLandline} />
          ) : null}
          {isStudent ? <TextField type={'number'} title={'Class'} placeholder={'Class'} value={cls} setter={setCls} /> : null}
        </div>
        <div className='layout-not-student'>
          <h1>Adding Teacher/Passenger ?</h1>
          <Switch
            onChange={(e) => {
              setIsStudent(!e.target.checked);
            }}
            value={!isStudent}
            size='md'
            defaultIsChecked={false}
          />
        </div>
        {isStudent ? (
          <>
            <div className='layout-sub-title'>Guardian Details</div>
            <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
              {guardianDetails.map((item, i) => {
                return item.type === 'dropdown' ? (
                  <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
                ) : item.type === 'upload' ? (
                  <FilePicker title={item.title} value={item.value} setter={item.setter} />
                ) : (
                  <TextField
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
          </>
        ) : null}
        <div className='layout-sub-title'>Boarding Details</div>
        <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
          {boardingDetails.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown
                key={i}
                title={item.title}
                fix={item.fix}
                options={item.options}
                value={item.value}
                setter={item.setter}
                isRequired={item.isRequired}
              />
            ) : item.type === 'upload' ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                key={i}
                type={item.type}
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
        <div className='layout-sub-title'>Fee Details</div>
        <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
          {feeDetails.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === 'upload' ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                key={i}
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
            collection={`passenger/${id}`}
            data={{
              name,
              phone,
              photo,
              DOB,
              landline,
              route: route?.id,
              school: school?.id,
              location: {
                type: 'Point',
                coordinates: location?.coordinates || [23.861998, 78.803366],
                address: address,
              },
              amount,
              isStudent,
              cls,
              joiningDate,
              dueDate,
              guardian: {
                name: guardian,
              },
            }}
          />
          <DeleteButton

          // data={{ name, busNumber, capacity }}
          />
        </div>
      </div>
    </div>
  );
}
