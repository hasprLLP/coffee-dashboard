//& Input Components [#IMPORTS#]
import axios from 'axios';
import TextField from '@/components/input';
import DropDown from '@/components/dropdown';
import SaveButton from '@/components/saveButton';
import { LoadScript } from '@react-google-maps/api';
import Map from '@/utilities/map';
import { useState, useEffect, useCallback } from 'react';
import GoBack from '@/helpers/goback';

//& Create & Export Driver [#FUNCTION#]
export default function AddRoute() {
  const [name, setName] = useState();
  const [morningDeparture, setMorningDeparture] = useState("06:00 AM");
  const [morningArrival, setMorningArrival] = useState("08:00 AM");
  const [afternoonDeparture, setEveningDeparture] = useState("02:00 PM");
  const [startsFrom, setStartsFrom] = useState();
  const [school, setSchool] = useState({});
  const [schools, setSchools] = useState([]);
  const [schoolNames, setSchoolNames] = useState([]);
  const [bus, setBus] = useState({});
  const [buses, setBuses] = useState([]);
  const [busNames, setBusNames] = useState([]);

  const setterArray = [setName, setMorningDeparture, setMorningArrival, setEveningDeparture, setStartsFrom, setSchool, setBus];

    const [clean, setClean] = useState(true)

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

  const getBuses = useCallback(async () => {
    try {
      const response = await axios.get(`bus/`);
      console.log('response', response);
      setBuses(response.data.data);
      const tempBusNames = [];
      response.data.data.map((bus) => {
        tempBusNames.push(bus.name);
      });
      setBusNames(tempBusNames);
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const setBusID = (busName) => {
    const busObj = buses?.find((bus) => bus?.name === busName);
    setBus(busObj);
  };
  const setSchoolID = (schoolName) => {
    const schoolObj = schools?.find((school) => school?.name === schoolName);
    setSchool(schoolObj);
  };

  useEffect(() => {
    getSchools();
    getBuses();
  }, [getSchools, getBuses]);

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
      value: afternoonDeparture,
      setter: setEveningDeparture,
    },
  ];
  const details = [
    { title: 'Name', placeholder: 'Route Name', value: name, setter: setName },
    { title: 'Starts from', placeholder: 'Starting Point Address', value: startsFrom, setter: setStartsFrom },
    { title: 'Destination (School)', options: schoolNames, value: school?.name, setter: setSchoolID, type: 'dropdown' },
    { title: 'Assign Bus', options: busNames, value: bus?.name, setter: setBusID, type: 'dropdown' },
  ];


  useEffect(() => {
    setName('');
    setMorningDeparture('06:00 AM');
    setMorningArrival('08:00 AM');
    setEveningDeparture('02:00 PM');
    setStartsFrom('');
    setSchool({ name: '' })
    setBus({ name: '' })
  }, [clean])

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Add Route
        </div>
        <div className="layout-sub-title">Timing Details</div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {timing.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField type={item.type} key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />
            )
          })}
        </div>
        <div className="layout-sub-title">Basic Details</div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {details.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField type={item.type} key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />
            )
          })}
        </div>
        <SaveButton
          collection={'route'}
          reset={setClean}
          data={{
            name,
            morningDeparture,
            morningArrival,
            afternoonDeparture,
            startsFrom: {
              type: 'Point',
              coordinates: [0, 0],
              address: startsFrom,
            },
            school: school?.id,
            bus: bus?.id,
          }}
        />
      </div>
    </div>
  )
}
