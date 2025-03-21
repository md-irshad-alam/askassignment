import dbconnection from "@/app/lib/dbconnection";
import subCategoryModel from "@/app/models/subcategoryschema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
  try {
    await dbconnection();
    const body = await req.json();
    const { category, subCategory, isActive } = body;

    const newCategory = new subCategoryModel({
      category,
      subCategory,
      isActive,
    });
    await newCategory.save();
    return NextResponse.json(
      { message: "Category created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Category creation failed", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  try {
    await dbconnection();
    const categories = await subCategoryModel.find();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log("Category fetch failed", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (req.method !== "PUT") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  try {
    await dbconnection();
    const body = await req.json();
    const { id, category, subCategory, isActive } = body;
    if (!id || !category || isActive === undefined) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const updatedCategory = await subCategoryModel.findByIdAndUpdate(
      id,
      { category, subCategory, isActive },
      { new: true }
    );
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.log("Category update failed", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  try {
    await dbconnection();
    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    await subCategoryModel.findByIdAndDelete(id);
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
