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
        <div className='driver-sub-title'>Route Detail</div>
        <div className='driver-sub-title'>Attendance Detail</div>
        <div className='driver-sub-title'>Boarding point at the map</div>
        <div className='driver-sub-title'>send notification</div>
        <div className='driver-sub-title'>Etc....</div>
      </div>
    </div>
  );
}
