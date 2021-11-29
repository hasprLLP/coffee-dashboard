import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req, res) {
  const { pathname } = req.nextUrl;
  if (pathname !== '/login') {
    if (req.cookies.authorization) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect('/login');
    }
  }

  // try {
  //   let data = {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: req.cookies.jwt,
  //     },
  //   };
  //   const { pathname } = req.nextUrl;

  //   if (pathname !== '/login') {
  //     const is_auth = await fetch(process.env.SERVER_URL + 'admin/authentication/verify', data);

  //     if (is_auth.status === 200) {
  //       return NextResponse.next();
  //     } else {
  //       return NextResponse.redirect('/login');
  //     }
  //   }

  //   if (pathname === '/login') {
  //     const is_auth = await fetch(process.env.SERVER_URL + 'admin/authentication/verify', data);
  //     console.log(is_auth);
  //     if (is_auth.status === 200) {
  //       return NextResponse.redirect('/');
  //     } else {
  //       return NextResponse.next();
  //     }
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return NextResponse.next();
  // }
}
