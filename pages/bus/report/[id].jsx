import { useRouter } from 'next/router';
import GoBack from '@/helpers/goback';
import { JSONToHTMLTable } from '@kevincobain2000/json-to-html-table';
import { useEffect, useState } from 'react';
import axios from 'axios';

const server = axios.create({
  baseURL: `${process.env.SERVER_URL}`,
  timeout: 10000,
  withCredentials: true,
});
//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await server.get(`/bus/${id}?populate=owner`);
      setData(data.data);
    };

    fetch();
  }, [id]);

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
