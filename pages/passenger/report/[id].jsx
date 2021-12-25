import { useRouter } from 'next/router';
import GoBack from '@/helpers/goback';
import { JSONToHTMLTable } from '@kevincobain2000/json-to-html-table';
import { useState, useEffect } from 'react';
import axios from 'axios';

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();
  const getPassenger = async () => {
    try {
      const response = await axios.get(`passenger/${id}`);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router?.query?.data) {
      getPassenger();
    }
  }, [router.query.data, data]);
  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <div className='home-shift'>
        <div className='layout-title'>
          <GoBack />
          Details{' '}
        </div>
        <div style={{ textTransform: 'capitalize' }} className='table-report'>
          {data && <JSONToHTMLTable data={data} />}
        </div>

        <br />
      </div>
    </div>
  );
}
