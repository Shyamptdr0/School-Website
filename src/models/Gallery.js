// models/Gallery.js
import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // <-- Add this
        imageUrl: { type: String, required: true },
        publicId: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
