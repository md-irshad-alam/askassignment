import mongoose, { Schema, Document, models, model } from "mongoose";
import bcrypt from "bcryptjs";

// Define the user interface
export interface IUser extends Document {
  category: string;
  isActive: string;
}

// Create the schema
const categroySchema = new Schema<IUser>({
  category: { type: String, required: true },
  isActive: { type: String, required: true },
});
const categoryModel =
  models.category || model<IUser>("category", categroySchema);
export default categoryModel;
