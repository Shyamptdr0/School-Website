import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectMongoose } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import Category from "@/models/Category"; // import Category model

export const config = {
    api: { bodyParser: false },
};

// GET: fetch all photos with category info
export async function GET() {
    await connectMongoose();
    const photos = await Gallery.find()
        .sort({ createdAt: -1 })
        .populate("category", "name"); // populate category name
    return NextResponse.json(photos);
}

// POST: upload new photo with category
export async function POST(req) {
    try {
        await connectMongoose();
        const formData = await req.formData();
        const title = formData.get("title") || "";
        const categoryId = formData.get("category");
        const file = formData.get("file");

        if (!file) return NextResponse.json({ success: false, error: "No file uploaded" });
        if (!categoryId) return NextResponse.json({ success: false, error: "Category required" });

        // upload image to Cloudinary
        const buffer = Buffer.from(await file.arrayBuffer());
        const upload = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "sports_gallery" },
                (err, res) => (err ? reject(err) : resolve(res))
            );
            stream.end(buffer);
        });

        // create gallery document
        const photo = await Gallery.create({
            title,
            category: categoryId,
            imageUrl: upload.secure_url,
            publicId: upload.public_id,
        });

        return NextResponse.json({ success: true, photo });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message });
    }
}

// PUT: update photo and optionally change image or category
export async function PUT(req) {
    try {
        await connectMongoose();
        const formData = await req.formData();
        const id = formData.get("id");
        const title = formData.get("title") || "";
        const categoryId = formData.get("category");
        const file = formData.get("file");

        const updateData = { title };
        if (categoryId) updateData.category = categoryId;

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const upload = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "sports_gallery" },
                    (err, res) => (err ? reject(err) : resolve(res))
                );
                stream.end(buffer);
            });
            updateData.imageUrl = upload.secure_url;
            updateData.publicId = upload.public_id;
        }

        await Gallery.findByIdAndUpdate(id, updateData);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message });
    }
}

// DELETE: delete photo
export async function DELETE(req) {
    try {
        await connectMongoose();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        const photo = await Gallery.findById(id);
        if (!photo) return NextResponse.json({ success: false, error: "Not found" });

        // delete image from Cloudinary
        await cloudinary.uploader.destroy(photo.publicId);
        await Gallery.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
