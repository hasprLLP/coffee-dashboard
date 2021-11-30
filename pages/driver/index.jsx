//& Input Components [#IMPORTS#]
import SimpleCard from '@/components/simpleCard';
import TextField from '@/components/input';
import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import server from 'src/functions/server';
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function ViewDriver() {
  const [driverName, setDriverName] = useState('');
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await server.get(`/operator`);
      setData(data.data);
    };

    fetch();
  }, []);

  const onEdit = (id, data) => {
    router.push({ pathname: `/driver/edit/${id}`, query: { data: JSON.stringify(data) } });
  };
  const onDetails = (id, data) => {
    router.push({ pathname: `/driver/report/${id}`, query: { data: JSON.stringify(data) } });
  };

  //& Fuse JS [#FUSE#]
  //$ New Fuse Instance with Settings
  const fuse = new Fuse(data, {
    isCaseSensitive: false,
    includeScore: false,
    shouldSort: true,
    includeMatches: true,
    findAllMatches: true,
    minMatchCharLength: 0,
    keys: ['name', 'owner', 'RCNumber'],
  });

  const result = driverName !== '' && fuse.search(driverName);
  const resultFilter = result && result.map((result) => result.item);
  const searchResultDisplay = resultFilter || data;

  //& Return UI [#RETURN#]
  return (
    <div className='home' style={{ backgroundColor: 'var(--chakra-colors-gray-100)' }}>
      <div className='home-shift'>
        <TextField title={'Search Driver Name'} placeholder={'Type Driver name'} value={driverName} setter={setDriverName} color={'white'} />
        <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
          {searchResultDisplay.map((item, i) => {
            return (
              <SimpleCard
                key={i}
                name={item.name}
                id={item.id}
                heading={['DL', 'Phone']}
                info={[item.dl, item.phone]}
                data={item}
                start={item.start}
                end={item.end}
                type={item.type}
                onEdit={onEdit}
                onDetails={onDetails}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
