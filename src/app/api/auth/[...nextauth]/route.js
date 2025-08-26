import { connectMongoose } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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

                    // Find krishna-academy-admin by email instead of name
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
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/krishna-academy-admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = "admin";
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
