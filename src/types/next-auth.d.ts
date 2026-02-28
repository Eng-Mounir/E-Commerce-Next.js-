import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id?: string;
    user?: any;
    token?: string;
  }

  interface Session {
    user: any;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    user?: any;
    accessToken?: string;
  }
}
