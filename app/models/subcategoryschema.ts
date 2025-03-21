import mongoose, { Schema, Document, models, model } from "mongoose";
import bcrypt from "bcryptjs";

// Define the user interface
export interface IUser extends Document {
  category: string;
  subCategory: string;
  isActive: boolean;
}

// Create the schema
const SubcategroySchema = new Schema<IUser>({
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});
const subCategoryModel =
  models.subcategory || model<IUser>("subcategory", SubcategroySchema);
export default subCategoryModel;
