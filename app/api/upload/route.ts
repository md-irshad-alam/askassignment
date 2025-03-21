import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    console.log("File:", file);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // ✅ Ensure only images & PDFs are uploaded
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only images and PDFs allowed" },
        { status: 400 }
      );
    }

    // ✅ Define the upload directory
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // ✅ Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // ✅ Save File to `public/uploads/`
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // ✅ Return file URL
    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json(
      { message: "File uploaded successfully", fileUrl },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("File Upload Error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
