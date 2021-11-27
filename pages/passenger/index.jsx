//& Input Components [#IMPORTS#]
import PassengerCard from '@/components/passengerCard';
import { useState, useEffect } from 'react';
import server from 'functions/server';
import TextField from '@/components/input';
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function Passenger() {
  const [student, setStudent] = useState('');

  const router = useRouter();
  const [passengers, setPassengers] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await server.get(`/passenger?populate=route`);
      setPassengers(data.data);
    };

    fetch();
  }, []);

  //$ States and Hooks [#STATES#]
  const onEdit = (id, data) => {
    router.push({ pathname: `/passenger/${id}`, query: { data: JSON.stringify(data) } });
  };
  const onDetail = (id, data) => {
    router.push({ pathname: `/passenger/details/${id}`, query: { data: JSON.stringify(data) } });
  };
  const onFeeDetail = (id, data) => {
    router.push({ pathname: `/passenger/fee/${id}`, query: { data: JSON.stringify(data) } });
  };

  //& Return UI [#RETURN#]
  return (
    <div className='home' style={{ backgroundColor: 'var(--chakra-colors-gray-100)' }}>
      <div className='driver'>
        <TextField title={'Search Student Name'} placeholder={'Type student name'} value={student} setter={setStudent} color={'white'} />
        <div className='driver-form' style={{ justifyContent: 'flex-start' }}>
          {passengers.map((passenger, i) => {
            return <PassengerCard key={i} onFeeDetail={onFeeDetail} id={passenger.id} onEdit={onEdit} onDetail={onDetail} passenger={passenger} />;
          })}
        </div>
      </div>
    </div>
  );
}
