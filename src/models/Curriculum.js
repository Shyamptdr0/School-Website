import mongoose from "mongoose";

const CurriculumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    classGroup: { type: String, required: true }, // <-- Added
    file: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Curriculum || mongoose.model("Curriculum", CurriculumSchema);
