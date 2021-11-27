//& Input Components [#IMPORTS#]
import PhotoCard from '@/components/photocard';
import { useState, useEffect } from 'react';
import server from 'functions/server';
import TextField from '@/components/input';
import { useRouter } from 'next/router';

//& Create & Export Driver [#FUNCTION#]
export default function Passenger() {
  const [student, setStudent] = useState('');

  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await server.get(`/passenger`);
        // setData(data.data);
        console.log(data);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetch();
  }, []);

  //$ States and Hooks [#STATES#]
  const fields = [
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
    {
      name: 'Pavan Chand Gupta',
      fee: '875',
      details: 'Guardian Name ,Address and all other details here',
      photo:
        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className='home' style={{ backgroundColor: 'var(--chakra-colors-gray-100)' }}>
      <div className='driver'>
        <TextField title={'Search Student Name'} placeholder={'Type student name'} value={student} setter={setStudent} color={'white'} />
        <div className='driver-form' style={{ justifyContent: 'flex-start' }}>
          {fields.map((item, i) => {
            return <PhotoCard key={i} name={item.name} photo={item.photo} fee={item.fee} details={item.details} />;
          })}
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className='home'>
  //     <h1 style={{ fontSize: '40px' }}>List Of all Bus</h1>
  //     <div style={{ display: 'flex', flexDirection: 'column' }}>
  //       {data.map((bus, index) => {
  //         return (
  //           <button
  //             key={index}
  //             onClick={() => {
  //               router.push({ pathname: `/bus/${bus.id}`, query: { data: JSON.stringify(bus) } });
  //             }}
  //           >
  //             {bus.name}
  //           </button>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
}
