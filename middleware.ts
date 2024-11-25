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

const requestHeaders = new Headers(request.headers);
requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
    
  });
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/staff/:path*',
    '/coordinator/:path*',
    '/',
  ],
};