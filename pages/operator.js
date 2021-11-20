import { useRouter } from 'next/router';
import CreateOperator from 'page/operator/create';
import ProfileOperator from 'page/operator/profile';

//& Create & Export Driver [#FUNCTION#]
export default function Operator() {
  const router = useRouter();
  const { page } = router.query;
  console.log(page);
  //& Return UI [#RETURN#]
  return page === 'create' ? (
    <CreateOperator />
  ) : page === 'profile' ? (
    <ProfileOperator />
  ) : (
    <div className='home'>
      <h1 style={{ fontSize: '20px' }}>We think You are lost. Nothing here with name || {page} ||</h1>
    </div>
  );
}
