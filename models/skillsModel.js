import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    icon: {
      type: String, // URL or icon name from library
      required: true,
    },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Database", "Tools", "Other"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
