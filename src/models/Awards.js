// src/models/Awards.js
import mongoose from "mongoose"; // ← ADD THIS

const AwardsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    imageUrls: { type: [String], default: [] },
    publicIds: { type: [String], default: [] },
}, { timestamps: true });

const Awards = mongoose.models.Awards || mongoose.model("Awards", AwardsSchema);
export default Awards;
