import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload buffer to Cloudinary
        const upload = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "faculty" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            streamifier.createReadStream(buffer).pipe(uploadStream);
        });

        return NextResponse.json({
            imageUrl: upload.secure_url,
            imageId: upload.public_id,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
