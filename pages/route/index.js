//& Input Components [#IMPORTS#]
import RouteCard from '@/components/routeCard';
import TextField from '@/components/input';
import server from '@/functions/server';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function ViewRoute() {
  const router = useRouter();
  const [routeName, setRouteName] = useState('');
  //$ Getting all the routes
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await server.get(`/route?populate=school,bus`);
      setRoutes(data.data);
    };

    fetch();
  }, []);

  const onEdit = (id, data) => {
    router.push({ pathname: `/route/${id}`, query: { data: JSON.stringify(data) } });
  };
  const onDetails = (id, data) => {
    router.push({ pathname: `/route/details/${id}`, query: { data: JSON.stringify(data) } });
  };

  //& Return UI [#RETURN#]
  return (
    <div className='home' style={{ backgroundColor: 'var(--chakra-colors-gray-100)' }}>
      <div className='driver'>
        <TextField title={'Search Route Name'} placeholder={'Type Route Details'} value={routeName} setter={setRouteName} color={'white'} />
        <div className='driver-form' style={{ justifyContent: 'flex-start' }}>
          {routes.map((route, i) => {
            return <RouteCard key={i} id={route._id} route={route} onEdit={onEdit} onDetails={onDetails} />;
          })}
        </div>
      </div>
    </div>
  );
}
