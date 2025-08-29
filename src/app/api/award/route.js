import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectMongoose } from "@/lib/mongodb";
import Awards from "@/models/Awards";

export const config = { api: { bodyParser: false } };

// GET all awards
export async function GET() {
    await connectMongoose();
    const awards = await Awards.find().sort({ createdAt: -1 });
    return NextResponse.json(awards);
}

// POST: create new award(s)
export async function POST(req) {
    try {
        await connectMongoose();
        const formData = await req.formData();
        const title = formData.get("title") || "";
        const description = formData.get("description") || "";
        const files = formData.getAll("files");

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, error: "No file uploaded" });
        }

        const imageUrls = [];
        const publicIds = [];

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const upload = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "sports_Awards" },
                    (err, res) => (err ? reject(err) : resolve(res))
                );
                stream.end(buffer);
            });

            imageUrls.push(upload.secure_url);
            publicIds.push(upload.public_id);
        }

        const award = await Awards.create({ title, description, imageUrls, publicIds });
        return NextResponse.json({ success: true, award });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message });
    }
}

// PUT: update award (title, description, new images, remove deleted images)
export async function PUT(req) {
    try {
        await connectMongoose();
        const formData = await req.formData();
        const id = formData.get("id");
        const title = formData.get("title") || "";
        const description = formData.get("description") || "";
        const files = formData.getAll("files");
        const deletedImages = formData.getAll("deletedImages[]"); // array of URLs to delete

        const award = await Awards.findById(id);
        if (!award) return NextResponse.json({ success: false, error: "Award not found" });

        // Remove deleted images
        if (deletedImages.length > 0) {
            for (const url of deletedImages) {
                const idx = award.imageUrls.indexOf(url);
                if (idx !== -1) {
                    await cloudinary.uploader.destroy(award.publicIds[idx]);
                    award.imageUrls.splice(idx, 1);
                    award.publicIds.splice(idx, 1);
                }
            }
        }

        // Upload new files
        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const upload = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "sports_Awards" },
                    (err, res) => (err ? reject(err) : resolve(res))
                );
                stream.end(buffer);
            });
            award.imageUrls.push(upload.secure_url);
            award.publicIds.push(upload.public_id);
        }

        award.title = title;
        award.description = description;
        await award.save();

        return NextResponse.json({ success: true, award });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message });
    }
}

// DELETE: delete award
export async function DELETE(req) {
    try {
        await connectMongoose();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        const award = await Awards.findById(id);
        if (!award) return NextResponse.json({ success: false, error: "Not found" });

        // Delete images from Cloudinary
        for (const publicId of award.publicIds) {
            await cloudinary.uploader.destroy(publicId);
        }

        await Awards.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
