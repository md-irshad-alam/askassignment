import mongoose from "mongoose";

const ProductSchmaItems = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String },
  productname: { type: String },
  image: { type: String, required: true },
  shortDescription: { type: String },
  desc: [
    {
      title: String,
      heading: String,
      content: String,
    },
  ],
  feature: [{ content: String }],
  uploadfile: [
    {
      heading: String,
      fileUrl: String, // PDF or file URL
    },
  ],
});

const productitemModel =
  mongoose.models.items || mongoose.model("items", ProductSchmaItems);
export default productitemModel;
