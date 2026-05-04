import jwt from "jsonwebtoken";
import { connectDB } from "./db";
import User from "@/models/User";

export async function verifyAdmin(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    
    if (!token) {
      return { authenticated: false, user: null };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    await connectDB();
    const user = await User.findById(decoded.id);
    
    if (!user || user.role !== "admin") {
      return { authenticated: false, user: null };
    }

    return { authenticated: true, user };
  } catch (error) {
    console.error("Auth verification error:", error);
    return { authenticated: false, user: null };
  }
}

export function requireAdmin(handler) {
  return async (req, context) => {
    try {
      const token = req.headers.get("authorization")?.split(" ")[1];
      
      if (!token) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      await connectDB();
      const user = await User.findById(decoded.id);
      
      if (!user || user.role !== "admin") {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
      }

      return handler(req, user, context);
    } catch (error) {
      console.error("Auth error:", error);
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
  };
}
