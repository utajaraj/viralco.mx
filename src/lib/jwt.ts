import { SignJWT, jwtVerify, base64url, type JWTPayload } from 'jose';
const secrecy: any = process.env.JWTKEY
const jwtkey = base64url.decode(secrecy);
export async function sign(value: string): Promise<string> {
    const tkn = await new SignJWT({ value })
        .setProtectedHeader({ alg: 'HS256', typ: "JWT" })
        .setIssuedAt()
        .sign(jwtkey);
    return tkn
}

export async function verify(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, jwtkey);
        return true;
    } catch (error) {
        return false
    }
}