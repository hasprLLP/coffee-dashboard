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
        <div className='driver-sub-title'> Distance Covered</div>
        <div className='driver-sub-title'> Passengers List</div>
        <div className='driver-sub-title'> Routes </div>
        <div className='driver-sub-title'> Schools</div>
        <div className='driver-sub-title'> Booked Timings </div>
        <div className='driver-sub-title'> Maintenance reminder </div>
        <div className='driver-sub-title'> Out of service </div>
        <div className='driver-sub-title'> Owner </div>
        <div className='driver-sub-title'> Notes </div>
        <div className='driver-sub-title'> last Located @ </div>
      </div>
    </div>
  );
}
