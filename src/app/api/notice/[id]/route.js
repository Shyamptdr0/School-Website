import { NextResponse } from "next/server";
import {connectMongoose} from "@/lib/mongodb";
import Notice from "@/models/Notice";

export async function PUT(request, { params }) {
    await connectMongoose();
    const { id } = params;
    const body = await request.json();
    const updated = await Notice.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
    await connectMongoose();
    const { id } = params;
    await Notice.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
}
