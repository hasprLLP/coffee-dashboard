import axios from 'axios';
import { useState } from 'react';
import * as cookie from 'cookie';

export default function Home() {
  return (
    <div className='home'>
      <div style={{ marginLeft: '5vw', width: '85%', height: '100%', marginTop: '5vw' }}>Dashboard</div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  // const parsedCookies = cookie.parse(req.headers.cookie);

  if (!req.headers.cookie) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  //  const parsedCookies = cookie.parse(req.headers.cookie);
  //  if (!parsedCookies.jwt) {
  //    return {
  //      redirect: {
  //        destination: '/login',
  //        permanent: false,
  //      },
  //    };
  //  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
