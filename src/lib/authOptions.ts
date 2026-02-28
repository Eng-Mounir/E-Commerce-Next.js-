import { jwtDecode } from "jwt-decode";
import { signInUser } from "@/services/auth.services";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { decodedTokenType } from "@/interfaces/decodedTokenTypei";

const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;
                console.log("Credentials received:", credentials);
                try {
                    const { status, data } = await signInUser(credentials);
                    console.log("SIGNIN STATUS:", status);
                    console.log("SIGNIN DATA:", data);
                    console.log("Credentials received:", credentials);

                    if (status === 200 && data.message === "success") {
                        const decodedToken: decodedTokenType = jwtDecode(data.token);
                        return {
                            id: decodedToken.id,
                            user: data.user,
                            token: data.token,
                        };
                    } else {
                        console.log("Authorization failed:", data.message || "Invalid credentials");
                        return null;
                    }
                } catch (err) {
                    console.error("Authorize error:", err);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.user = user.user;
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user = token.user;
            }
            // Add accessToken to session
            (session as any).accessToken = token.accessToken;
            return session;
        }
    }
};

export default authOptions;
