//& Input Components [#IMPORTS#]
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function Bus() {
  const router = useRouter();
  const { id } = router.query;
  const data = JSON.parse(router.query.data);

  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <h1 style={{ fontSize: '40px' }}>Bus {id}</h1>
      <h1 style={{ fontSize: '40px' }}>Bus {data.name}</h1>
    </div>
  );
}
