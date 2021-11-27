//& Input Components [#IMPORTS#]
import SchoolCard from '@/components/schoolCard';
import { useState, useEffect } from 'react';
import server from 'functions/server';
import TextField from '@/components/input';
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function ViewBus() {
  const [busName, setBusName] = useState('');

  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await server.get(`/school`);
      setData(data.data);
    };

    fetch();
  }, []);

  const onEdit = (id, data) => {
    router.push({ pathname: `/school/${id}`, query: { data: JSON.stringify(data) } });
  };
  const onDetails = (id, data) => {
    router.push({ pathname: `/school/details/${id}`, query: { data: JSON.stringify(data) } });
  };
  //$ States and Hooks [#STATES#]

  //& Return UI [#RETURN#]
  return (
    <div className='home' style={{ backgroundColor: 'var(--chakra-colors-gray-100)' }}>
      <div className='driver'>
        <TextField title={'Search Bus No'} placeholder={'Type Bus No'} value={busName} setter={setBusName} color={'white'} />
        <div className='driver-form' style={{ justifyContent: 'flex-start' }}>
          {data &&
            data.map((item, i) => {
              return <SchoolCard key={i} id={item._id} name={item.name} data={item} phone={item.busNumber} onEdit={onEdit} onDetail={onDetails} />;
            })}
        </div>
      </div>
    </div>
  );
}
