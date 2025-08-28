import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectMongoose } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        await connectMongoose();

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // 🔑 Create JWT
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return NextResponse.json({ token });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
