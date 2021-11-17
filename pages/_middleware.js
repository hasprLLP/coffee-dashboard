import { NextResponse, NextRequest } from 'next/server';

import axios from 'axios';

export async function middleware(req, ev) {
  try {
    let data = {
      method: 'POST',
      credentials: 'include',
    };
    // FIXME: This is a temporary workaround for since axios throws an error with "adapter is not a funtion"
    const is_auth = await fetch('http://localhost:8080/api/v1/authentication/verify', data);
    const { pathname } = req.nextUrl;
    if (pathname !== '/login') {
      if (is_auth) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect('/login');
      }
    } else {
      return NextResponse.next();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.next();
  }
}
