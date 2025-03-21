import { NextResponse } from "next/server";
import productModel from "@/app/models/productScehma";

import dbconnection from "@/app/lib/dbconnection";
export async function POST(req: Request) {
  try {
    // ✅ Extract JSON data from request
    const {
      category,
      subcategory,
      productname,
      image,
      shortdesc,
      desc,
      feature,
      uploadfile,
    } = await req.json();
    console.log("Received Data:", { category, subcategory, productname });
    // ✅ Ensure `desc`, `feature`, and `uploadfile` are valid objects/arrays
    if (typeof desc !== "object" || !desc) {
      return NextResponse.json(
        { error: "Invalid desc format" },
        { status: 400 }
      );
    }

    if (!Array.isArray(feature)) {
      return NextResponse.json(
        { error: "Feature must be an array" },
        { status: 400 }
      );
    }

    if (!Array.isArray(uploadfile)) {
      return NextResponse.json(
        { error: "Uploadfile must be an array" },
        { status: 400 }
      );
    }

    // ✅ Create new Product document
    const newProduct = new productModel({
      category,
      subcategory,
      productname,
      image, // This should be the uploaded image URL
      shortdesc,
      desc, // Already an object
      feature, // Already an array
      uploadfile, // Already an array
    });

    // ✅ Save to MongoDB
    await newProduct.save();

    return NextResponse.json(
      { message: "Product created successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Product Creation Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // ✅ Fetch all products
    await dbconnection();
    const products = await productModel.find();
    return NextResponse.json({ products });
  } catch (error: any) {
    console.error("Product Fetch Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
