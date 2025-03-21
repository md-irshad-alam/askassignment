import AuthModel from "@/app/models/authSchema";
import bcrypt from "bcryptjs";
import dbconnection from "@/app/lib/dbconnection";
type registerType = {
  email: string;
  password: string;
  name: string;
};
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  await dbconnection();
  try {
    const body = await req.json();
    const { name, email, password }: any = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const existingUser = await AuthModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await AuthModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log("registration faild", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export default registerController;
