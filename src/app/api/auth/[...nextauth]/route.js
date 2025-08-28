import { connectMongoose } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await connectMongoose();
                    const admin = await Admin.findOne({ email });

                    if (!admin) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, admin.password);

                    if (!passwordsMatch) {
                        return null;
                    }

                    return admin;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
