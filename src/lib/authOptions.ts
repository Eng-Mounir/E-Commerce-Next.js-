import {jwtDecode } from "jwt-decode";
import { signInUser } from "@/services/auth.services";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { decodedTokenType } from "@/app/interfaces/decodedTokenTypei";

const authOptions :NextAuthOptions = {
    pages:{
        signIn:"/login",
    },
    providers:[
        CredentialsProvider({
            name:"Credentials",     
            credentials:{
                email:{label:"Email", type:"email", placeholder:"Enter your email"},
                password:{label:"Password", type:"password", placeholder:"Enter your password"}
            },  
async authorize(credentials) {
  if (!credentials) return null;
  console.log("Credentials received:", credentials);
  try {
    const { status, data } = await signInUser(credentials);
    console.log("SIGNIN STATUS:", status);
    console.log("SIGNIN DATA:", data);
    console.log("Credentials received:", credentials);
     if (status !== 200 || data.message !== "success") {
        
  return null;
}
    if (status === 200 && data.success) {
      const decodedToken: decodedTokenType = jwtDecode(data.token);
      return {
        id: decodedToken.id,
        user: data.user,
        token: data.token,
      };
      
      
    } else {
      console.log("Authorization failed:", data.message || "Invalid credentials");
      return null; // NextAuth will redirect to error page
    }
  } catch (err) {
    console.error("Authorize error:", err);
    return null;
  }
}
        })
    ],
    // session:{
    //     strategy:"jwt",
    // },
    // jwt:{
    //     secret: process.env.NEXTAUTH_SECRET,
    // },
}
export default authOptions;
