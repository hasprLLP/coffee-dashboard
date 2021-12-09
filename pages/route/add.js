//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import DropDown from '@/components/dropdown';
import SaveButton from '@/components/saveButton';
import axios from 'axios';
import { LoadScript } from '@react-google-maps/api';
import Map from '@/utilities/map';
import { useState, useEffect } from 'react';
import server from 'src/backend/node/server';

//& Create & Export Driver [#FUNCTION#]
export default function AddRoute() {
  const lib = ['places'];
  const key = 'AIzaSyCHvfKSXzV5-wKUkV5XvwJwp4n5RHc9lNA';

  const [name, setName] = useState();
  const [morningDeparture, setMorningDeparture] = useState();
  const [morningArrival, setMorningArrival] = useState();
  const [eveningDeparture, setEveningDeparture] = useState();
  const [startsFrom, setStartsFrom] = useState();
  //` Added Underscore to avoid conflict with the name of the package
  const [package_, setPackage] = useState({});
  const [packages, setPackages] = useState([]);
  const [packageNames, setPackageNames] = useState([]);
  const [school, setSchool] = useState({});
  const [schools, setSchools] = useState([]);
  const [schoolNames, setSchoolNames] = useState([]);
  const [bus, setBus] = useState({});
  const [buses, setBuses] = useState([]);
  const [busNames, setBusNames] = useState([]);

  const getPackages = async () => {
    try {
      const response = await server.get(`package`);
      setPackages(response.data.data);
      const tempPackageNames = [];
      response.data.data.map((bus) => {
        tempPackageNames.push(bus.name);
      });
      setPackageNames(tempPackageNames);
    } catch (error) {
      console.log('Error while fetching Packages: ', error);
    }
  };

  const getSchools = async () => {
    try {
      const response = await server.get(`${process.env.SERVER_URL}school/`);
      setSchools(response.data.data);
      const tempSchoolNames = [];
      response.data.data.map((school) => {
        tempSchoolNames.push(school.name);
      });
      setSchoolNames(tempSchoolNames);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getBuses = async () => {
    try {
      const response = await server.get(`${process.env.SERVER_URL}bus/`);
      setBuses(response.data.data);
      const tempBusNames = [];
      response.data.data.map((bus) => {
        tempBusNames.push(bus.name);
      });
      setBusNames(tempBusNames);
    } catch (error) {
      console.log('error', error);
    }
  };

  const setBusID = (busName) => {
    const busObj = buses?.find((bus) => bus?.name === busName);
    setBus(busObj);
  };
  const setSchoolID = (schoolName) => {
    const schoolObj = schools?.find((school) => school?.name === schoolName);
    setSchool(schoolObj);
  };
  const setPackageID = (packageName) => {
    const packageObj = packages?.find((_package) => _package?.name === packageName);
    setPackage(packageObj);
  };

  useEffect(() => {
    getPackages();
    getSchools();
    getBuses();
  }, []);

  const setterArray = [setName, setMorningDeparture, setMorningArrival, setEveningDeparture, setStartsFrom, setSchool, setBus];

  //$ States and Hooks [#STATES#]
  const timing = [
    {
      title: 'Bus Starts (Morning)',
      type: 'time',
      placeholder: 'Time of departure in morning',
      value: morningDeparture,
      setter: setMorningDeparture,
    },
    {
      title: 'Bus Reaches School (Morning)',
      type: 'time',
      placeholder: 'Time of arrival at school in morning',
      value: morningArrival,
      setter: setMorningArrival,
    },
    {
      title: 'Bus Leaves School (Evening)',
      type: 'time',
      placeholder: 'Time of departure in evening',
      value: eveningDeparture,
      setter: setEveningDeparture,
    },
  ];
  const details = [
    { title: 'Name', placeholder: 'Route Name', value: name, setter: setName },
    { title: 'Starts from', placeholder: 'Starting Point Address', value: startsFrom, setter: setStartsFrom },
    { title: 'Destination (School)', options: schoolNames, value: school?.name, setter: setSchoolID, type: 'dropdown' },
    { title: 'Assign Bus', options: busNames, value: bus?.name, setter: setBusID, type: 'dropdown' },
    { title: 'Select Package', isRequired: true, options: packageNames, value: package_?.name, setter: setPackageID, type: 'dropdown' },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='home-shift'>
        <div className='layout-title'>Add Route</div>
        <div className='layout-sub-title'>Timing Details</div>
        <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
          {timing.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField type={item.type} key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />
            );
          })}
        </div>
        <div className='layout-sub-title'>Basic Details</div>
        <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
          {details.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField type={item.type} key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />
            );
          })}
        </div>
        <LoadScript googleMapsApiKey={key} libraries={lib}>
          <Map />
        </LoadScript>
        <SaveButton
          collection={'route'}
          reset={setterArray}
          data={{
            name,
            morningDeparture,
            morningArrival,
            eveningDeparture,
            startsFrom: {
              type: 'Point',
              coordinates: [23.86135575696267, 78.80405223062922],
              address: 'Gour Nagar, Makroniya, Madhya Pradesh 470001',
            },
            school: school?.id,
            bus: bus?.id,
            package: package_?.id,
          }}
        />
      </div>
    </div>
  );
}
