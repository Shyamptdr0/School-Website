import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
    await connectMongoose();
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json(categories);
}

export async function POST(req) {
    await connectMongoose();
    const { name } = await req.json();
    if (!name) return NextResponse.json({ success: false, error: "Name required" });

    const category = await Category.create({ name });
    return NextResponse.json({ success: true, category });
}

export async function PUT(req) {
    await connectMongoose();
    const { id, name } = await req.json();
    if (!id || !name) return NextResponse.json({ success: false, error: "ID and name required" });

    await Category.findByIdAndUpdate(id, { name });
    return NextResponse.json({ success: true });
}

export async function DELETE(req) {
    await connectMongoose();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "ID required" });

    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
