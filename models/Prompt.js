import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 12000,
    },
    category: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "General",
    },
    favorite: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

promptSchema.index({ userId: 1, updatedAt: -1 });
promptSchema.index({ userId: 1, favorite: 1, updatedAt: -1 });

promptSchema.set("toJSON", {
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    ret.userId = ret.userId.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Prompt =
  mongoose.models.Prompt || mongoose.model("Prompt", promptSchema);

export default Prompt;
