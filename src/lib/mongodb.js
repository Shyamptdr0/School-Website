import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";

let isConnected = false; // track connection state

export const connectMongoose = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("❌ MONGODB_URI not found in .env");
        }

        if (isConnected) {
            // Already connected
            return mongoose.connection;
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("✅ Connected to MongoDB");

        // Ensure default school-admin exists only once after connection
        await ensureDefaultAdmin();

        return conn;
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
};

async function ensureDefaultAdmin() {
    try {
        const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL;
        const defaultAdminPass = process.env.DEFAULT_ADMIN_PASS;

        if (!defaultAdminEmail || !defaultAdminPass) {
            console.warn("⚠️ Default school-admin credentials missing in .env");
            return;
        }

        // 🔑 Check by email instead of name
        const adminExists = await Admin.findOne({ email: defaultAdminEmail });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash(defaultAdminPass, 10);
            await Admin.create({
                email: defaultAdminEmail,
                password: hashedPassword,
            });
            console.log(`👤 Default admin created: ${defaultAdminEmail}`);
        } else {
            console.log("👤 Default school-admin already exists");
        }
    } catch (err) {
        console.error("❌ Error ensuring default school-admin:", err);
    }
}
