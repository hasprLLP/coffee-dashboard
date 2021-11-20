import { NextResponse, NextRequest } from 'next/server';

import axios from 'axios';

export async function middleware(req, res) {
  try {
    // FIXME: This is a temporary workaround for since axios throws an error with "adapter is not a funtion"
    let data = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: req.cookies.jwt,
      },
    };
    const { pathname } = req.nextUrl;

    if (pathname === '/login') {
      console.log('on Login page');
      const is_auth = await fetch('http://localhost:8080/api/v1/authentication/verify', data);

      if (is_auth.status === 200) {
        return NextResponse.redirect('/');
      } else {
        return NextResponse.next();
      }
    }

    if (pathname === '/') {
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
