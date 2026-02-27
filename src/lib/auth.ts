import {cookies} from 'next/headers'
import { decode } from "next-auth/jwt"; 

export async function getToken() {
    const decodedToken = (await cookies()).get("__Secure-next-auth.session-token")?.value
    const token = await decode({token: decodedToken, secret: process.env.NEXTAUTH_SECRET!})
    console.log("Decoded Token:", token?.accessToken)  
    return token?.accessToken || null
}

// // src/lib/auth.ts
// import { cookies } from "next/headers"; // built-in Next.js
// import { decode } from "next-auth/jwt";

// export async function getToken() {
//   // read cookies from the request
//   const cookieStore = cookies(); 
//   const sessionToken = cookieStore.get("__Secure-next-auth.session-token")?.value;

//   if (!sessionToken) return null;

//   // decode JWT token
//   const token = await decode({
//     token: sessionToken,
//     secret: process.env.NEXTAUTH_SECRET!,
//   });

//   console.log("Decoded Token:", token?.accessToken);
//   return token?.accessToken || null;
// }