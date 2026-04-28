import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  const users = await User.find();
  return Response.json({ users });
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();

  await User.findByIdAndDelete(id);

  return Response.json({ message: "User deleted" });
}