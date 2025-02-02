import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
  resetPasswordRequest,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfile,
  updateProfileCoverPhoto,
  updateUserRole,
  verificationUser,
} from "../controllers/authController.js";
import { isAdmin, isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Verify User
router.post("/verify", verificationUser);

// Login User
router.post("/login", loginUser);

// Social Auth
router.post("/social", socialAuth);

// Update Access Token
router.post("/update-access-token", isAuthenticated, updateAccessToken);

// All Users
router.get("/all-users", getAllUsers);

// Get User By Id
router.get("/user/:id", getUserById);

// Update User Role
router.put("/user/:id", isAuthenticated, updateUserRole);

// Delete User
router.delete("/user/:id", isAuthenticated, isAdmin, deleteUser);

// Reset Password Request
router.post("/reset-password", resetPasswordRequest);

// Update Password
router.post("/update-password", updatePassword);

// Update Profile
router.put("/profile/:id", isAuthenticated, updateProfile);

// Update Profile Cover Photo
router.put(
  "/profile-cover-photo/:id",
  isAuthenticated,
  updateProfileCoverPhoto
);

export default router;
