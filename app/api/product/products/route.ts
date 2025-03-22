import { NextResponse, NextRequest } from "next/server";

import dbconnection from "@/app/lib/dbconnection";
import productitemModel from "@/app/models/productschemafile";
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
    // check all filed are field ,
    const missingFields = [];
    if (!category) missingFields.push("category");
    if (!subcategory) missingFields.push("subcategory");
    if (!productname) missingFields.push("productname");
    if (!image) missingFields.push("image");
    if (!shortdesc) missingFields.push("shortdesc");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `The following fields are required: ${missingFields.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // ✅ Create new Product document
    const newProduct = new productitemModel({
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
  } catch (error) {
    console.error("Product Creation Error:", error);
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // ✅ Fetch all products
    await dbconnection();
    const products = await productitemModel.find();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Product Fetch Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// delete product
export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    await productitemModel.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Category deletion failed", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
