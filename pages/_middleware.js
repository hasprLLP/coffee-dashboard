import { NextResponse, NextRequest } from 'next/server';

export function middleware(req, res) {
  const is_auth = fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'GET' });
  console.log(is_auth.status);
  const { pathname } = req.nextUrl;
  if (pathname !== '/login') {
    if (is_auth.status !== 200) {
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
