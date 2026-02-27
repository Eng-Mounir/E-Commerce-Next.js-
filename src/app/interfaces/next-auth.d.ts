import {JWT} from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        user:UserInfoI;
        token:string;
    }
    interface UserInfoI {
        name:string;
        email:string;
        role:string;
    }       
}
declare module "next-auth/jwt" {
  interface JWT {
    user: UserInfoI;
    accessToken: string;
    id?: string;
  }

}