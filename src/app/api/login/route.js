import {connectMongoose} from "@/lib/mongodb";
import AdminInfo from "@/models/Admin";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoose();
        const { email } = await req.json();
        const admin = await AdminInfo.findOne({ email }).select("_id");
        console.log("krishna-academy-admin: ", admin);
        return NextResponse.json({ admin });
    } catch (error) {
        console.log(error);
    }
}
