import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req, res) {
  try {
    await connectDB();

    // Delete existing admin if any
    await User.deleteOne({ email: "admin@alphaaryx.com" });

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create new admin user
    const adminUser = new User({
      name: "Admin",
      email: "admin@alphaaryx.com",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();

    // Return without password
    return Response.json({ 
      message: "Admin created successfully", 
      user: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role
      }
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}