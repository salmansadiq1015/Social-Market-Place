import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  profilePicture: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvts5aHBstDkR8PigS4RmZkbZy78zpZoSuOw&s",
  },
  coverPhoto: {
    type: String,
    default:
      "https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2521.jpg",
  },
  bio: {
    type: String,
    default: "",
    trim: true,
  },
  location: {
    type: String,
    default: "",
    trim: true,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sendFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  block: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpire: {
    type: Date,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
