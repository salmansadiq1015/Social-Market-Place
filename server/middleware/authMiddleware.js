import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "JWT token must be provided!",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(400).send({
        success: false,
        message: "Invalid token or expired!",
      });
    }

    const user = await userModel.findById(decode.id);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid token or expired!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while isAuthenticated!",
      error,
    });
  }
};

// Is Admin
export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access! User not authenticated.",
      });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found!",
      });
    }

    if (user.role !== "admin" && user.role !== "superadmin") {
      return res.status(401).send({
        success: false,
        message: "Forbidden! User does not have admin privileges.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while isAdmin!",
      error,
    });
  }
};
