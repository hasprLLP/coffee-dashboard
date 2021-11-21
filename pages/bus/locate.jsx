//& Create & Export Driver [#FUNCTION#]
export default function locate() {
  // FIXME:className 'driver', 'driver-form' & 'driver-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='driver'>
        <div className='driver-title'>Locate Bus</div>
        <div className='driver-form'></div>
      </div>
    </div>
  );
}
