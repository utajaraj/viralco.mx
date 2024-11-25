import { Authenticator } from "@/lib/authentication";
import { NextRequest, NextResponse } from "next/server";

interface AuthenticationBody {
    username: string,
    password: string
}

export async function POST(request: NextRequest) {

    const body: AuthenticationBody = await request.json()

    const authentication = new Authenticator(body)


    await authentication.authenticate()
    
    if (authentication.isAuthenticated) {
        const response = NextResponse.json({ status: true, message: "Authentication Successful" },{status:200})
        await authentication.refreshToken(response)
        return response
    }
    return NextResponse.json({ status: false, message: "Invalid Credentials" },{status:400})
}