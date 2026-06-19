import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // ✅ check existing user FIRST
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json({
      message: "Account created successfully",
      user,
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);

    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}