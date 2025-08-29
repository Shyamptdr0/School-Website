import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongodb";
import Faculty from "@/models/Faculty";

export async function GET() {
    await connectMongoose();
    const data = await Faculty.find();
    return NextResponse.json(data);
}

export async function POST(req) {
    await connectMongoose();
    const body = await req.json();
    const { name, profession, imageUrl, imageId } = body;
    const faculty = new Faculty({ name, profession, imageUrl, imageId });
    await faculty.save();
    return NextResponse.json(faculty);
}
