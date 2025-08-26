import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    profession: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imageId: { type: String, required: true }, // for deleting from cloudinary
});

export default mongoose.models.Faculty || mongoose.model("Faculty", FacultySchema);
