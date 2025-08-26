import { NextResponse } from "next/server";
import {connectMongoose} from "@/lib/mongodb";
import Notice from "@/models/Notice";

// GET: fetch active notice
export async function GET() {
    await connectMongoose();
    const notice = await Notice.findOne({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json(notice);
}

// POST: create new notice
export async function POST(request) {
    await connectMongoose();
    const { title, content, isActive } = await request.json();
    const newNotice = await Notice.create({ title, content, isActive });
    return NextResponse.json(newNotice, { status: 201 });
}
