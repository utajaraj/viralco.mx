import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Authenticator } from './lib/authentication'

export async function middleware(request: NextRequest) {
    try {
        const authCookie: any = request.cookies.get('Authorization')
        const token = authCookie?.value || undefined
        if (token === undefined || typeof token !== "string") {
            return NextResponse.redirect(new URL('/', request.url))
        }
        const authentication = new Authenticator()
        await authentication.authenticate(token)
        if (authentication.isAuthenticated) {
            const response = NextResponse.next()
            await authentication.refreshToken(response)
            return response
        }
        return NextResponse.redirect(new URL('/', request.url))
    } catch (error) {
        console.log(error);
    }
}

// // See "Matching Paths" below to learn more
export const config = {
    matcher: ['/api/:path*', '/dashboard/:path*'],
}