//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import DropDown from '@/components/dropdown';
import SaveButton from '@/components/saveButton';
import axios from 'axios';
import { LoadScript } from '@react-google-maps/api';
import Map from '@/utilities/map';
import { useState, useEffect } from 'react';
import server from '@/functions/server';
// const server = axios.create({
//   baseURL: `${process.env.SERVER_URL}`,
//   timeout: 10000,
//   withCredentials: true,
// });

//& Create & Export Driver [#FUNCTION#]
export default function AddRoute() {
  const lib = ['places'];
  const key = 'AIzaSyCHvfKSXzV5-wKUkV5XvwJwp4n5RHc9lNA';

  const getSchool = async () => {
    try {
      const response = await server.get(`${process.env.SERVER_URL}school/`);
      setSchool(response.data.data);
      const tempSchoolName = [];
      response.data.data.map((school) => {
        tempSchoolName.push(school.name);
      });
      setSchoolNames(tempSchoolName);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getBus = async () => {
    try {
      const response = await server.get(`${process.env.SERVER_URL}bus/`);
      setBus(response.data.data);
      const tempSchoolName = [];
      response.data.data.map((school) => {
        tempSchoolName.push(school.name);
      });
      setBusNames(tempSchoolName);
    } catch (error) {
      console.log('error', error);
    }
  };

  const setSchoolID = (name) => {
    // get the object with name = school from array of schools
    const schoolObj = school?.find((school) => school.name === name);
    setSchool(schoolObj.id);
  };
  const setBusID = (name) => {
    // get the object with name = school from array of schools
    const busObj = bus?.find((bus) => bus.name === name);
    setBus(busObj.id);
  };

  useEffect(() => {
    getSchool();
    getBus();
  }, []);

  const [name, setName] = useState();
  const [morningDeparture, setMorningDeparture] = useState();
  const [morningArrival, setMorningArrival] = useState();
  const [eveningDeparture, setEveningDeparture] = useState();
  const [note, setNote] = useState();
  const [school, setSchool] = useState();
  const [schoolNames, setSchoolNames] = useState([]);
  const [bus, setBus] = useState();
  const [busNames, setBusNames] = useState([]);

  //$ States and Hooks [#STATES#]
  const details = [
    { title: 'Name', placeholder: 'Route Name', value: name, setter: setName },
    { title: 'School Name', options: schoolNames, value: school?.name, setter: setSchoolID, type: 'dropdown' },
    { title: 'Bus', options: busNames, value: bus?.name, setter: setBusID, type: 'dropdown' },
    { title: 'Note', placeholder: 'Anything to remember ?', value: note, setter: setNote },
  ];
  const timing = [
    {
      title: 'Morning Departure Time',
      type: 'time',
      placeholder: 'Time of departure in morning',
      value: morningDeparture,
      setter: setMorningDeparture,
    },
    {
      title: 'Morning Arrival Time',
      type: 'time',
      placeholder: 'Time of arrival at school in morning',
      value: morningArrival,
      setter: setMorningArrival,
    },
    {
      title: 'Evening Departure Time',
      type: 'time',
      placeholder: 'Time of departure in evening',
      value: eveningDeparture,
      setter: setEveningDeparture,
    },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='driver'>
        <div className='passenger-title'>Add Route</div>
        <div className='passenger-sub-title'>Timing Details</div>
        <div className='driver-form'>
          {timing.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField type={item.type} key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />
            );
          })}
        </div>
        <div className='passenger-sub-title'>Basic Details</div>
        <div className='driver-form'>
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
          data={{
            name,
            morningDeparture,
            morningArrival,
            eveningDeparture,
            note,
            school,
            bus,
          }}
        />
      </div>
    </div>
  );
}
