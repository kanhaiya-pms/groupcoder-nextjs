import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ACCESS_TOKEN } from './utils/constant';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    console.log('middleware called');

    let cookie = request.cookies.get(ACCESS_TOKEN)
    console.log(cookie?.value);
    
    if (!cookie?.value) {

        url.pathname = '/signin'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/account/:path*'],
}