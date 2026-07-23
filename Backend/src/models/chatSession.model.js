import mongoose from "mongoose";

const chatSessionSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "New Chat",
      trim: true,
    },

    model: {
      type: String,
      default: "gemini-2.5-flash",
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const ChatSession = mongoose.model(
  "ChatSession",
  chatSessionSchema
);