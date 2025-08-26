import mongoose from "mongoose";

const AwardsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        imageUrl: { type: String, required: true },
        publicId: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Awards || mongoose.model("Awards", AwardsSchema);
