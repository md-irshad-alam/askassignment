import mongoose, { Schema, Document, models, model } from "mongoose";
import bcrypt from "bcryptjs";

// Define the user interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Create the schema
const AuthSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save hook for password hashing
AuthSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Use existing model if already compiled
const AuthModel = models.auth || model<IUser>("auth", AuthSchema);

export default AuthModel;
