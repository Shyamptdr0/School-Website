import { connectMongoose } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const MAX_IDLE_SECONDS = 15 * 60; // 15 minutes idle timeout

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

                try {
                    await connectMongoose();
                    const admin = await Admin.findOne({ email });
                    if (!admin) return null;

                    const isValid = await bcrypt.compare(password, admin.password);
                    if (!isValid) return null;

                    return {
                        id: admin._id.toString(),
                        email: admin.email,
                        role: "admin",
                    };
                } catch (error) {
                    console.error("❌ Error in authorize:", error);
                    return null;
                }
            },
        }),
    ],

    // ⚡ Use JWT for session handling
    session: {
        strategy: "jwt",
    },

    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                // ❌ do not set maxAge → makes it a session cookie
                // ❌ do not set expires
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

            // 🔹 On login → initialize fields
            if (user) {
                token.role = user.role ?? "admin";
                token.lastActivity = now;
                token.expired = false;
                return token;
            }

            // 🔹 Already expired → stay expired
            if (token?.expired) {
                return token;
            }

            // 🔹 Check idle timeout
            if (token?.lastActivity) {
                const idleSeconds = now - token.lastActivity;
                if (idleSeconds > MAX_IDLE_SECONDS) {
                    token.expired = true; // mark as expired
                    return token;
                }
            }

            // 🔹 Refresh activity timestamp
            token.lastActivity = now;
            token.expired = false;
            return token;
        },

        async session({ session, token }) {
            // If expired → end session (user will be logged out)
            if (!token || token.expired) {
                return null;
            }
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
