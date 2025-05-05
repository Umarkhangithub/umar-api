import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String }, // Optional icon URL or icon class
  category: { type: String },
  status: { type: String, default: "active" },
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
