import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  // Check if the request is for the admin panel (excluding login and change-password pages)
  if (request.nextUrl.pathname.startsWith('/admin-panel-fcc-2025') && 
      !request.nextUrl.pathname.includes('/login') &&
      !request.nextUrl.pathname.includes('/change-password')) {
    
    // Get the admin token from cookies
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      // No token, redirect to login
      const loginUrl = new URL('/admin-panel-fcc-2025/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-change-in-production') as {
        adminId: string;
        isTemporary?: boolean;
        mustChangePassword?: boolean;
      };
      
      // Check if this is a temporary token requiring password change
      if (decoded.isTemporary || decoded.mustChangePassword) {
        const changePasswordUrl = new URL('/admin-panel-fcc-2025/change-password', request.url);
        return NextResponse.redirect(changePasswordUrl);
      }
      
      // Token is valid, allow the request to continue
      return NextResponse.next();
    } catch (error) {
      // Invalid token, redirect to login
      console.log('Invalid admin token:', error);
      const loginUrl = new URL('/admin-panel-fcc-2025/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // For all other requests, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all admin panel routes
    '/admin-panel-fcc-2025/:path*'
  ]
};
