import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const admin = await User.findOne({ email: "admin@alphaaryx.com" });

    if (!admin) {
      return Response.json({ error: "Admin not found" }, { status: 404 });
    }

    return Response.json({ adminId: admin._id });
  } catch (error) {
    console.error("Error fetching admin:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}