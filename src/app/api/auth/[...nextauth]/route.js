// app/api/auth/[...nextauth]/route.js
import { connectMongoose } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const MAX_IDLE_SECONDS = 15 * 60; // 15 min idle timeout

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                await connectMongoose();
                const admin = await Admin.findOne({ email });
                if (!admin) return null;

                const isValid = await bcrypt.compare(password, admin.password);
                if (!isValid) return null;

                return { id: admin._id.toString(), email: admin.email, role: "admin" };
            },
        }),
    ],

    session: {
        strategy: "jwt", // JWT required for credentials
        maxAge: MAX_IDLE_SECONDS,
    },

    cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                // ✅ No maxAge → session cookie (deleted on browser close)
            },
        },
    },

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/krishna-academy-admin/login",
    },

    callbacks: {
        async jwt({ token, user }) {
            const now = Math.floor(Date.now() / 1000);

            if (user) {
                token.role = user.role ?? "admin";
                token.lastActivity = now;
                token.expired = false;
                return token;
            }

            if (token?.expired) return token;

            if (token?.lastActivity) {
                const idleSeconds = now - token.lastActivity;
                if (idleSeconds > MAX_IDLE_SECONDS) {
                    token.expired = true;
                    return token;
                }
            }

            token.lastActivity = now;
            token.expired = false;
            return token;
        },

        async session({ session, token }) {
            if (!token || token.expired) return null;
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
