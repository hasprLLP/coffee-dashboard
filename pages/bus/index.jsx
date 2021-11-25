//& Input Components [#IMPORTS#]
import { useState, useEffect } from 'react';
import server from 'functions/server';
import { useRouter } from 'next/router';
//& Create & Export Driver [#FUNCTION#]
export default function Bus() {
  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await server.get(`/bus`);
      setData(data.data);
    };

    fetch();
  }, []);
  //& Return UI [#RETURN#]
  return (
    <div className='home'>
      <h1 style={{ fontSize: '40px' }}>List Of all Bus</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {data.map((bus, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                router.push({ pathname: `/bus/${bus.id}`, query: { data: JSON.stringify(bus) } });
              }}
            >
              {bus.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
