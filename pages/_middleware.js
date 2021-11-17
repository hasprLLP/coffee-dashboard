import { NextResponse, NextRequest } from 'next/server';

import axios from 'axios';

export async function middleware(req, res) {
  try {
    let data = {
      method: 'POST',
      mode: 'no-cors', // It can be no-cors, cors, same-origin
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', // Your headers
      },
    };
    // FIXME: This is a temporary workaround for since axios throws an error with "adapter is not a funtion"

    const { pathname } = req.nextUrl;

    if (pathname === '/') {
      console.log('verify needed', pathname);
      const is_auth = await fetch('http://localhost:8080/api/v1/authentication/verify', data);

      if (is_auth.status === 200) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect('/login');
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.next();
  }
}
