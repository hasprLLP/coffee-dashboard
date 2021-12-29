//& Input Components [#IMPORTS#]
import SimpleCard from '@/components/simpleCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import Filler from '@/components/filler';
import TextField from '@/components/input';
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function ViewOwner() {
  const [ownerName, setOwnerName] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`/owner`);
      setData(data.data);
      setLoading(true);
    };

    fetch();
  }, []);

  const onEdit = (id, data) => {
    router.push({ pathname: `/redeem/edit/${id}`, query: { data: JSON.stringify(data) } });
  };
  const onDetails = (id, data) => {
    router.push({ pathname: `/redeem/report/${id}`, query: { data: JSON.stringify(data) } });
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
    keys: ['name'],
  });

  const result = ownerName !== '' && fuse.search(ownerName);
  const resultFilter = result && result.map((result) => result.item);
  const searchResultDisplay = resultFilter || data;

  //& Return UI [#RETURN#]
  return (
    <div className='home' style={{ backgroundColor: 'var(--chakra-colors-gray-100)' }}>
      <div className='home-shift'>
        <TextField title={'Search Bus Owner Name'} placeholder={'Type Owner Details'} value={ownerName} setter={setOwnerName} color={'white'} />
        <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
          {!loading && <Filler cards={4} />}
          {!searchResultDisplay.length && loading && <div className='home-empty'>No Bus Owners Available</div>}
          {searchResultDisplay &&
            searchResultDisplay.map((item, i) => {
              return (
                <SimpleCard
                  key={i}
                  id={item._id}
                  name={item.name}
                  heading={['Name', 'Phone']}
                  info={[item.name, item.phone]}
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
