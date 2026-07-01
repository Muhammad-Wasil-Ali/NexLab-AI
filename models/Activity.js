import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "prompt_created",
        "prompt_updated",
        "prompt_deleted",
        "prompt_favorited",
        "prompt_unfavorited",
        "chat_started",
        "chat_deleted",
        "profile_updated",
      ],
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    entityType: {
      type: String,
      enum: ["Chat", "Prompt", null],
      default: null,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

activitySchema.index({ userId: 1, createdAt: -1 });

activitySchema.set("toJSON", {
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    ret.userId = ret.userId.toString();
    if (ret.entityId) {
      ret.entityId = ret.entityId.toString();
    }
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;
