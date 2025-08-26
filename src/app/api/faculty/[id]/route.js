import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongodb";
import Faculty from "@/models/Faculty";
import cloudinary from "@/lib/cloudinary";

export async function GET(req, { params }) {
    await connectMongoose();
    const faculty = await Faculty.findById(params.id);
    if (!faculty) return NextResponse.json({ error: "Faculty not found" }, { status: 404 });
    return NextResponse.json(faculty);
}

export async function PUT(req, { params }) {
    await connectMongoose();
    const body = await req.json();
    const updatedFaculty = await Faculty.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedFaculty) return NextResponse.json({ error: "Faculty not found" }, { status: 404 });
    return NextResponse.json(updatedFaculty);
}

export async function DELETE(req, { params }) {
    await connectMongoose();
    const faculty = await Faculty.findById(params.id);
    if (!faculty) return NextResponse.json({ error: "Faculty not found" }, { status: 404 });

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(faculty.imageId);

    await Faculty.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
}
