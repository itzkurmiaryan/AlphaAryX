import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req, res) {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@alphaaryx.com" });

    if (existingAdmin) {
      return Response.json({ message: "Admin already exists", user: existingAdmin });
    }

    // Create admin user
    const adminUser = new User({
      name: "Admin",
      email: "admin@alphaaryx.com",
      password: "admin123", // In production, hash this password
      role: "admin",
    });

    await adminUser.save();

    return Response.json({ message: "Admin created successfully", user: adminUser });
  } catch (error) {
    console.error("Error creating admin:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}