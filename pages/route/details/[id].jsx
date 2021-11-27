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
        <div className='driver-sub-title'> Average Distance </div>
        <div className='driver-sub-title'> Average Time </div>
        <div className='driver-sub-title'> Passengers with stops </div>
        <div className='driver-sub-title'> History </div>
        <div className='driver-sub-title'> All timings </div>
        <div className='driver-sub-title'> Add remark or note </div>
        <div className='driver-sub-title'> On Map</div>
        <div className='driver-sub-title'> Bus </div>
      </div>
    </div>
  );
}
