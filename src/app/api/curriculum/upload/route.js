import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongodb";
import Curriculum from "@/models/Curriculum";
import fs from "fs";
import path from "path";

// 📥 POST - Upload Curriculum
export async function POST(req) {
    try {
        await connectMongoose();

        const formData = await req.formData();
        const file = formData.get("file");
        const title = formData.get("title") || (file ? file.name : "Untitled");
        const classGroup = formData.get("classGroup"); // <-- Added

        if (!file) {
            return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
        }
        if (!classGroup) {
            return NextResponse.json({ success: false, error: "Class group required" }, { status: 400 });
        }

        // Save file to /public/uploads/curriculum
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadDir = path.join(process.cwd(), "public", "uploads", "curriculum");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, file.name);
        fs.writeFileSync(filePath, buffer);

        // Save in MongoDB
        const curriculum = await Curriculum.create({
            title,
            classGroup, // <-- Save it
            file: `/uploads/curriculum/${file.name}`,
        });

        return NextResponse.json({ success: true, curriculum });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// 📤 GET - Fetch All Curriculums
export async function GET() {
    try {
        await connectMongoose();
        const curriculums = await Curriculum.find().sort({ createdAt: -1 });
        return NextResponse.json(curriculums);
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// ❌ DELETE - Remove Curriculum
export async function DELETE(req) {
    try {
        await connectMongoose();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        const curriculum = await Curriculum.findById(id);
        if (!curriculum) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

        // Delete file from disk
        const filePath = path.join(process.cwd(), "public", curriculum.file);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        await Curriculum.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
