import { NextResponse, NextRequest } from 'next/server';
//import jwt from 'express-jwt';
export async function middleware(req, res) {
  const { pathname } = req.nextUrl;
  const { cookies } = req;
  if (cookies.authorization) {
    //const authorized = jwt({ secret: process.env.JWT_SECRET, algorithms: ['RS256'], requestProperty: 'id' });
    if (pathname === '/login') {
      return NextResponse.redirect('/');
    }
  } else {
    if (pathname !== '/login') {
      return NextResponse.redirect('/login');
    }
  }

  return NextResponse.next();
}
