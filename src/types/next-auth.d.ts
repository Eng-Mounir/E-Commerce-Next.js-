import "next-auth";
import { JWT } from "next-auth/jwt";
import { UserInfoI } from "@/interfaces/userInfo";

declare module "next-auth" {
  interface User {
    user: UserInfoI;
    token: string;
  }

  interface Session {
    user: UserInfoI;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserInfoI;
    accessToken: string;
    id?: string;
  }
}
