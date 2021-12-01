//& Input Components [#IMPORTS#]
import SimpleCard from '@/components/simpleCard';
import TextField from '@/components/input';
import server from 'src/backend/node/server';
import Fuse from 'fuse.js';
import Filler from "@/components/filler";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function ViewPackage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [packageName, setPackageName] = useState('');
  //$ Getting all the Packages
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await server.get(`/package`);
      setPackages(data.data);
      setLoading(true);
    };

    fetch();
  }, []);

  const onEdit = (id, data) => {
    router.push({ pathname: `/package/edit/${id}`, query: { data: JSON.stringify(data) } });
  };
  const onDetails = (id, data) => {
    router.push({ pathname: `/package/report/${id}`, query: { data: JSON.stringify(data) } });
  };

  //& Fuse JS [#FUSE#]
  //$ New Fuse Instance with Settings
  const fuse = new Fuse(packages, {
    isCaseSensitive: false,
    includeScore: false,
    shouldSort: true,
    includeMatches: true,
    findAllMatches: true,
    minMatchCharLength: 0,
    keys: ['name', 'guardian.name', 'phone', 'DOB'],
  });

  const result = packageName !== '' && fuse.search(packageName);
  const resultFilter = result && result.map((result) => result.item);
  const searchResultDisplay = resultFilter || packages;

  //& Return UI [#RETURN#]
  return (
    <div className='home' style={{ backgroundColor: 'var(--chakra-colors-gray-100)' }}>
      <div className='home-shift'>
        <TextField title={'Search Package Name'} placeholder={'Type Package Details'} value={packageName} setter={setPackageName} color={'white'} />
        <div className='layout-form' style={{ justifyContent: 'flex-start' }}>
        {!loading && <Filler cards={4} />}
          {!searchResultDisplay.length && loading && <div className="home-empty">No Packages Added</div>}
          {searchResultDisplay &&
            searchResultDisplay.map((pack, i) => {
              return (
                <SimpleCard
                  key={i}
                  id={pack._id}
                  name={pack.name}
                  data={pack}
                  heading={['Name', 'Monthly']}
                  info={[pack.name, pack.monthly]}
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
