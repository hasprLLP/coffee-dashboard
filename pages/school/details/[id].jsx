import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const data = JSON.parse(router.query.data);

  // FIXME:className 'driver', 'driver-form' & 'driver-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='driver'>
        <div className='driver-title'> Details </div>
        <div className='driver-title'> {data.name} </div>
        <div className='driver-sub-title'> Routes leads to </div>
        <div className='driver-sub-title'> Passengers</div>
        <div className='driver-sub-title'> timings </div>
        <div className='driver-sub-title'> Locate on map </div>
        <div className='driver-sub-title'> Contact</div>
        <div className='driver-sub-title'> Buses</div>
      </div>
    </div>
  );
}
