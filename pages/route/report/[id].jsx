import { useRouter } from 'next/router';
import GoBack from '@/helpers/goback';
import { JSONToHTMLTable } from '@kevincobain2000/json-to-html-table';
import { useState, useEffect } from 'react';

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();

  useEffect(() => {
    if (router?.query?.data) {
      setData(JSON.parse(router.query.data));
    }
  }, [router.query.data, data]);

  // FIXME:className 'driver', 'layout-form' & 'layout-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='home-shift'>
        <div className='layout-title'>
          <GoBack />
          Details{' '}
        </div>
        <div style={{ textTransform: 'capitalize' }} className='table-report'>
          {data ? <JSONToHTMLTable data={data} /> : null}
        </div>
        <br />
      </div>
    </div>
  );
}