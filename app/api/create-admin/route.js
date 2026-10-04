import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@alphaaryx.com" });

    if (existingAdmin) {
      if (!existingAdmin.password.startsWith("$2")) {
        existingAdmin.password = await bcrypt.hash("admin123", 10);
        await existingAdmin.save();
      }

      return Response.json({ message: "Admin already exists" });
    }

    // Create admin user
    const adminUser = new User({
      name: "Admin",
      email: "admin@alphaaryx.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    });

    await adminUser.save();

    return Response.json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error creating admin:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}