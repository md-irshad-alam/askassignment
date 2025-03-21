import AuthModel from "@/app/models/authSchema";
import bcrypt from "bcryptjs";
import dbconnection from "@/app/lib/dbconnection";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  await dbconnection();
  try {
    const body = await req.json();
    const { email, password }: any = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const isMathc = bcrypt.compare(password, user.password);
    if (!isMathc) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({ token }, { status: 201 });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      sameSite: "strict",
      path: "/",
    });
    return response;
  } catch (error) {
    console.log("registration faild", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// get the user details
export async function GET(req: NextRequest, res: NextResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  await dbconnection();
  try {
    const tokenCookie = cookies().get("token");
    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = tokenCookie.value;
    console.log("Token:", token);

    const { id }: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AuthModel.findById(id).select("-password");
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("registration faild", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export default registerController;
