import { NextResponse } from "next/server"
import { Credentials } from "./credentials"
import { sign, verify } from "./jwt"
export interface CredentialObjectInterface {
    username?: string,
    password?: string,
    token?: string,
}

export class Authenticator extends Credentials {
    private username: string = ""
    private password: string = ""
    private token: string = ""
    isAuthenticated: boolean = false
    constructor(credentialsObject?: CredentialObjectInterface) {
        super()
        if(credentialsObject){
            this.username = credentialsObject.username || ""
            this.password = credentialsObject.password || ""
            this.token = credentialsObject.token || ""
        }
    }
    async authenticate(token?: string) {

        const verification = await verify(token ?? "")
        
        if (token && verification) {
            this.isAuthenticated = true
            return this
        }
      if (this.system_username == this.username && this.system_password == this.password) {
            this.isAuthenticated = true
            return this
        }
        this.token = ""
        this.isAuthenticated = false
        return this
    }
    async refreshToken(response: NextResponse) {
        const signature = await sign("1")
        response.cookies.set('Authorization', signature, { maxAge: 86400, path: "*" })
        return this
    }
}