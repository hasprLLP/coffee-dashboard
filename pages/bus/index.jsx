//& Input Components [#IMPORTS#]
import SimpleCard from '@/components/simpleCard';
import { useState, useEffect } from 'react';
import server from '@/functions/server';
import TextField from '@/components/input';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function ViewBus() {
  const [busName, setBusName] = useState('');

  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await server.get(`/bus`);
      setData(data.data);
    };

    fetch();
  }, []);

  const onEdit = (id, data) => {
    router.push({ pathname: `/bus/edit/${id}`, query: { data: JSON.stringify(data) } });
  };
  const onDetails = (id, data) => {
    router.push({ pathname: `/bus/report/${id}`, query: { data: JSON.stringify(data) } });
  };

  //& Fuse JS [#FUSE#]
  //$ New Fuse Instance with Settings
  const fuse = new Fuse(data, {
    isCaseSensitive: false,
    includeScore: false,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 0,
    keys: ['name', 'owner', 'RCNumber'],
  });

  const result = busName !== '' && fuse.search(busName);
  const resultFilter = result && result.map((result) => result.item);
  const searchResultDisplay = resultFilter || data;

  //& Return UI [#RETURN#]
  return (
    <div className='home' style={{ backgroundColor: 'var(--chakra-colors-gray-100)' }}>
      <div className='home-shift'>
        <TextField title={'Search Bus No'} placeholder={'Type Bus No'} value={busName} setter={setBusName} color={'white'} />
        <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
          {searchResultDisplay &&
            searchResultDisplay.map((item, i) => {
              return (
                <SimpleCard
                  key={i}
                  name={item.name}
                  id={item._id}
                  heading={['Owner', 'RC']}
                  info={[item.owner || '', item.RCNumber || '']}
                  data={item}
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
