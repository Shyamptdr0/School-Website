import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import {connectMongoose} from "@/lib/mongodb";
import Awards from "@/models/Awards";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function GET() {
    await connectMongoose();
    const photos = await Awards.find().sort({ createdAt: -1 });
    return NextResponse.json(photos);
}

export async function POST(req) {
    try {
        await connectMongoose();

        const formData = await req.formData();
        const title = formData.get("title") || "";
        const description = formData.get("description") || ""; // ✅ fix
        const file = formData.get("file");

        if (!file) return NextResponse.json({ success: false, error: "No file uploaded" });

        const buffer = Buffer.from(await file.arrayBuffer());
        const upload = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: "sports_Awards" }, (err, res) =>
                err ? reject(err) : resolve(res)
            );
            stream.end(buffer);
        });

        const photo = await Awards.create({
            title,
            description,
            imageUrl: upload.secure_url,
            publicId: upload.public_id,
        });

        return NextResponse.json({ success: true, photo });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message });
    }
}

export async function PUT(req) {
    try {
        await connectMongoose();
        const formData = await req.formData();
        const id = formData.get("id");
        const title = formData.get("title") || "";
        const description = formData.get("description") || ""; // ✅ fix
        const file = formData.get("file");

        const updateData = { title, description };

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const upload = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: "Awards" }, (err, res) =>
                    err ? reject(err) : resolve(res)
                );
                stream.end(buffer);
            });
            updateData.imageUrl = upload.secure_url;
            updateData.publicId = upload.public_id;
        }

        await Awards.findByIdAndUpdate(id, updateData);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message });
    }
}

export async function DELETE(req) {
    try {
        await connectMongoose();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        const photo = await Awards.findById(id);
        if (!photo) return NextResponse.json({ success: false, error: "Not found" });

        await cloudinary.uploader.destroy(photo.publicId);
        await Awards.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
