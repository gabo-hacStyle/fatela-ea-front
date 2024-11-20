import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from './utils/cookiesManager';
import { User } from '.';

export function middleware(request: NextRequest) {
     const token = request.cookies.get('token');
    const user = request.cookies.get('user')?.value;
    const url = request.nextUrl.clone();

  // Si no hay token, redirigir al login
  if (!token) {
    if (url.pathname !== '/') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Si hay token, verificar el rol del usuario
  if (user) {
    const userData = JSON.parse(user) as User;
    const roles = userData.roles;
    // const roles = userData.roles.map((role: string) => role);

    // if (roles.includes('ADMIN')) {
    //   if (url.pathname !== '/admin') {
    //     url.pathname = '/admin';
    //     return NextResponse.redirect(url);
    //   }
    // } else if (roles.includes('STAFF')) {
    //   if (url.pathname !== '/staff') {
    //     url.pathname = '/staff';
    //     return NextResponse.redirect(url);
    //   }
    // } else if (roles.includes('COORDINATOR')) {
    //   if (url.pathname !== '/coordinator') {
    //     url.pathname = '/coordinator';
    //     return NextResponse.redirect(url);
    //   }
    // } else {
    //   // Si el rol no es reconocido, redirigir al login
    //   url.pathname = '/';
    //   return NextResponse.redirect(url);
    // }
  

  // Bloquear acceso a páginas no autorizadas
  if (url.pathname.startsWith('/admin') && !roles.includes('ADMIN')) {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }
  if (url.pathname.startsWith('/staff') && !roles.includes('STAFF')) {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }
  if (url.pathname.startsWith('/coordinator') && !roles.includes('COORDINATOR')) {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }
}

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/staff/:path*',
    '/coordinator/:path*',
    '/',
  ],
};