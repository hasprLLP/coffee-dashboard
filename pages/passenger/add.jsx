//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import DropDown from '@/components/dropdown';
import FilePicker from '@/components/filepicker';
import SaveButton from '@/components/saveButton';
import { Switch } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Loading from '@/blocks/loading';
import { format } from 'date-fns';

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [name, setName] = useState();
  const [isStudent, setIsStudent] = useState(true);
  const [clf, setClf] = useState(false);
  const [DOB, setDOB] = useState();
  const [gender, setGender] = useState('Male');
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
  const [photo, setPhoto] = useState({});
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cls, setCls] = useState();
  const [section, setSection] = useState('A');
  const [passengerID, setPassengerID] = useState();
  const [package_, setPackage] = useState({});
  const [packages, setPackages] = useState([]);
  const [packageNames, setPackageNames] = useState([]);

  const [loading, setLoading] = useState(false);

  const [pack, setPack] = useState([]);
  const [clean, setClean] = useState(true);

  const packType = ['annually', 'monthly', 'halfYearly', 'quarterly'];

  const getPackages = useCallback(async () => {
    try {
      const response = await axios.get(`package`);
      console.log(response.data.data);
      setPackages(response.data.data);
      const tempPackageNames = [];
      response.data.data.map((bus) => {
        tempPackageNames.push(bus.name);
      });
      setPackageNames(tempPackageNames);
    } catch (error) {
      console.log('Error while fetching Packages: ', error);
    }
  }, []);
  const setPackageID = (packageName) => {
    const packageObj = packages?.find((_package) => _package?.name === packageName);
    setPackage(packageObj);
  };

  const getSchools = useCallback(async () => {
    try {
      const response = await axios.get(`school/`);
      setSchools(response.data.data);
      const tempSchoolNames = [];
      response.data.data.map((school) => {
        tempSchoolNames.push(school.name);
      });
      setSchoolNames(tempSchoolNames);
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const setSchoolID = async (schoolName) => {
    if (schoolName !== '') {
      try {
        const schoolObj = schools?.find((school) => school?.name === schoolName);
        setSchool(schoolObj);
        setLoading(true);
        const response = await axios.get(`route${schoolObj ? `?school=${schoolObj?.id}` : ''}`);
        // const res = await axios.get(`misc/generate_passenger_id/${schoolObj.id}`);
        // setPassengerID(res.data.data);
        setRoutes(response.data.data);
        setLoading(false);
        const tempRoutesName = [];
        response.data.data.map((route) => {
          tempRoutesName.push(route.name);
        });
        setRouteNames(tempRoutesName);
      } catch (error) {
        console.log('error', error);
        setPassengerID('');
        setRoutes([]);
        setLoading(false);
      }
    } else {
      console.log('Here !');
      setSchool({ name: '' });

      setRoute({ name: '' });
    }
  };
  const setRouteID = (routeName) => {
    const routeObj = routes?.find((route) => route?.name === routeName);
    setRoute(routeObj);
  };

  useEffect(() => {
    setName('');
    setIsStudent(true);
    setDOB('');
    setJoiningDate('');
    setDueDate('');
    setGuardian('');
    setPhone('');
    setLandline('');
    setAddress('');
    setLocation('');
    setSchool({ name: '' });
    setGender('');
    setRoute({ name: '' });
    setRoutes([]);
    setRouteNames([]);
    setPhoto('');
    setAmount(0);
    setTotal(0);
    setDiscount(0);
    setCls('');
    setPackage({ name: '' });
    setClf(false);

    setPack([]);
  }, [clean]);

  useEffect(() => {
    getSchools();
    getPackages();
  }, [getSchools, getPackages]);

  useEffect(() => {
    if (pack && package_ && joiningDate) {
      const { monthly, annually, halfYearly, quarterly } = package_;
      const dueDate = new Date(joiningDate);
      dueDate.setDate(10);

      if (pack === 'monthly') {
        setDiscount(0);
        setAmount(monthly);
        // Extend date by one month
        dueDate.setMonth(dueDate.getMonth() + 1);
      } else if (pack === 'annually') {
        setDiscount(monthly * 12 - annually);
        setAmount(monthly * 12);
        dueDate.setMonth(dueDate.getMonth() + 12);
      } else if (pack === 'halfYearly') {
        setDiscount(monthly * 6 - halfYearly);
        setAmount(monthly * 6);
        dueDate.setMonth(dueDate.getMonth() + 6);
      } else if (pack === 'quarterly') {
        setDiscount(monthly * 3 - quarterly);
        setAmount(monthly * 3);
        dueDate.setMonth(dueDate.getMonth() + 3);
      }
      const formattedDueDate = format(dueDate, 'dd-MM-yyyy');
      setDueDate(formattedDueDate);
    }
  }, [pack, package_, joiningDate]);

  console.log('p[ack duration', pack);

  useEffect(() => {
    setTotal(amount - discount);
  }, [amount, discount]);
  const classesList = [
    'Pre-School',
    'Nursery',
    'LKG',
    'UKG',
    'Class I (1)',
    'Class II (2)',
    'Class III (3)',
    'Class IV (4)',
    'Class V (5)',
    'Class VI (6)',
    'Class VII (7)',
    'Class VIII (8)',
    'Class IX (9)',
    'Class X (10)',
    'Class XI (11)',
    'Class XII (12)',
  ];

  //$ States and Hooks [#STATES#]
  const basicFields = [
    { title: 'Name', isRequired: true, placeholder: 'Enter Passenger name', value: name, setter: setName },
    {
      title: `${isStudent ? 'Student' : 'Teacher'} ID`,
      isRequired: true,
      placeholder: `Enter ${isStudent ? 'Student' : 'Teacher'} ID`,
      value: passengerID,
      setter: setPassengerID,
    },
    { title: 'Upload Photo', value: photo, setter: setPhoto, type: 'upload' },
    { title: 'Gender', isRequired: true, options: ['Male', 'Female'], value: gender, setter: setGender, type: 'dropdown' },
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
    { title: 'Whatsapp (Optional)', placeholder: 'Whatsapp no', value: landline, setter: setLandline, type: 'tel' },
  ];

  const boardingDetails = [
    { title: 'Full Address', isRequired: true, placeholder: 'Boarding Point Address', value: address, setter: setAddress },
    {
      title: 'School',
      isRequired: true,
      page: '/school/add',
      options: schoolNames,
      value: school?.name,
      setter: setSchoolID,
      type: 'dropdown',
    },
    { title: 'Route', isRequired: true, options: routeNames, type: 'number', value: route?.name, setter: setRouteID, type: 'dropdown' },
  ];
  const feeDetails = [
    { title: 'Select Package', isRequired: true, options: packageNames, value: package_?.name, setter: setPackageID, type: 'dropdown' },
    { title: 'Select Duration', isRequired: true, options: packType, value: pack, setter: setPack, type: 'dropdown' },
    { title: 'Joining Date', type: 'date', placeholder: 'eg 02/07/2003', value: joiningDate, setter: setJoiningDate },
  ];

  //& Return UI [#RETURN#]
  return (
    <>
      {loading && <Loading />}
      <div className='home'>
        <div className='home-shift'>
          <div className='layout-title'>Add {isStudent ? 'Student' : 'Teacher'}</div>
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
          <div className='layout-sub-title'>{isStudent ? 'Student' : 'Teacher'} Details</div>
          <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
            {!isStudent ? (
              <TextField type={'tel'} title={'Mobile'} placeholder={'Contact No'} value={phone} setter={setPhone} prefix={'+91'} isRequired={true} />
            ) : null}
            {basicFields.map((item, i) => {
              return item.type === 'dropdown' ? (
                <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} onChange={item.onChange} />
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
                  isRequired={item.isRequired}
                />
              );
            })}
            {!isStudent ? <TextField type={'tel'} title={'Whatsapp'} placeholder={'Landline no'} value={landline} setter={setLandline} /> : null}
            {isStudent ? <DropDown title={'Class'} options={classesList} value={cls} setter={setCls} /> : null}
            {isStudent ? <TextField title={'Section'} placeholder={'Enter Section'} value={section} setter={setSection} /> : null}
          </div>
          <div className='layout-sub-title'>Boarding Details</div>
          <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
            {boardingDetails.map((item, i) => {
              return item.type === 'dropdown' ? (
                <DropDown
                  key={i}
                  page={item.page}
                  title={item.title}
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
                <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} onChange={item.onChange} />
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
          <div className='layout-not-student'>
            <h1>Add CLF Subscription </h1>
            <Switch
              onChange={(e) => {
                setClf((state) => !state);
              }}
              value={!clf}
              size='md'
              defaultIsChecked={false}
            />
          </div>
          <div
            className='layout-form'
            style={{
              width: '80%',
              flexWrap: 'wrap',
            }}
          >
            <div className='layout-sub-small' style={{ flex: 1 }}>
              Amount - ₹{amount}/-
            </div>
            <div className='layout-sub-small' style={{ flex: 1 }}>
              Discount - ₹{discount}/-
            </div>
            <div className='layout-sub-small' style={{ flex: 1 }}>
              Total - ₹{total}/-
            </div>
            <div className='layout-sub-small' style={{ flex: 1 }}>
              Due Date - {dueDate}
            </div>
          </div>
          {clf ? (
            <div className='layout-sub-small' style={{ flex: 1 }}>
              CLF - ₹500/-
            </div>
          ) : null}
          <SaveButton
            collection={'passenger'}
            reset={setClean}
            data={{
              name,
              phone: `+91${phone}`,
              photo,
              DOB,
              clf,
              gender,
              section,
              whatsApp: landline,
              route: route?.id,
              passengerID,
              school: school?.id,
              location: {
                type: 'Point',
                coordinates: [0, 0],
                address,
              },
              isStudent,
              cls,
              joiningDate,
              feePackage: package_?.id,
              pack,
              guardian: {
                name: guardian,
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
