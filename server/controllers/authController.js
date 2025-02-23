import {
  comparePassword,
  createRandomToken,
  hashPassword,
} from "../helper/encryption.js";
import sendMail from "../helper/mail.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, profilePicture } = req.body;

    if (!firstName) {
      return res.status(400).send({
        success: false,
        message: "First name is required!",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email  is required!",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is required!",
      });
    }

    // Existing User

    const isExisting = await userModel.findOne({ email });

    if (isExisting) {
      return res.status(400).send({
        success: false,
        message: "Email already exist!",
      });
    }
    // User

    const user = {
      firstName,
      lastName,
      email,
      password,
      profilePicture,
    };

    const activationToken = await createActivationToken(user);
    const activationCode = activationToken.activationCode;

    // Send Email to User
    const data = {
      user: { name: user.firstName + user.lastName },
      activationCode,
    };

    await sendMail({
      email: user.email,
      subject: "Varification Email!",
      template: "activation_code.ejs",
      data,
    });

    res.status(200).send({
      success: true,
      message: `Please cheak your email: ${user.email} to activate your account`,
      activationToken: activationToken.token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error register user!",
      error: error,
    });
  }
};

// Create Activation Token
export const createActivationToken = async (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign({ user, activationCode }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  return { token, activationCode };
};

// Save User
export const verificationUser = async (req, res) => {
  try {
    const { activation_token, activation_code } = req.body;

    if (!activation_token) {
      return res.status(400).send({
        success: false,
        message: "Activation_token is required! ",
      });
    }
    if (!activation_code) {
      return res.status(400).send({
        success: false,
        message: "Activation_code is required! ",
      });
    }

    const newUser = jwt.verify(activation_token, process.env.JWT_SECRET);
    if (!newUser) {
      return res.status(400).send({
        success: false,
        message: "Invalid activation token or expired!",
      });
    }
    if (newUser.activationCode !== activation_code) {
      return res.status({
        success: false,
        message: "Invalid activation code!",
      });
    }

    console.log("newUser:", newUser);

    const { firstName, lastName, email, password, profilePicture } =
      newUser.user;

    // Existing User
    const isExisting = await userModel.findOne({ email });

    if (isExisting) {
      return res.status(400).send({
        success: false,
        message: "Email already exist!",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicture,
    });

    res.status(200).send({
      success: true,
      message: "Register successfully!",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while register user after activation!",
    });
  }
};

// Login User Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email & Password in required!",
      });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid email & password!",
      });
    }

    if (user.block) {
      return res.status(400).send({
        success: false,
        message: "Your account is blocked!, Please contact support team.",
      });
    }

    const isPassword = await comparePassword(password, user.password);
    if (!isPassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      { id: user._id, user: user },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? "29d" : "1d" }
    );

    const {
      password: userPassword,
      passwordResetToken,
      passwordResetTokenExpire,
      ...userData
    } = user._doc;

    res.status(200).send({
      success: true,
      message: "Login successfully!",
      user: userData,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while login user!",
      error,
    });
  }
};

// Social Auth
export const socialAuth = async (req, res) => {
  try {
    const { email, firstName, profilePicture } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      const newUser = await userModel.create({
        email,
        firstName,
        profilePicture,
      });
      user = newUser;
    }

    // Generate token for the user
    const token = jwt.sign(
      { id: user._id, user: user },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Exclude password from response
    const { password, ...userData } = user._doc;

    // Send response
    res.status(200).send({
      success: true,
      message: "Login successfully!",
      user: userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while social login!",
      error,
    });
  }
};

// Update access token
export const updateAccessToken = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "Refesh token is required!",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(400).send({
        success: false,
        message: "Invalid token or expired!",
      });
    }
    const user = await userModel
      .findById(decode.id)
      .select("-password -passwordResetToken -passwordResetTokenExpire");

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid token or expired!",
      });
    }

    const newToken = jwt.sign(
      {
        id: user._id,
        user: { _id: user._id, name: user.firstName, email: user.email },
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    req.user = user;

    res.status(200).send({
      success: true,
      message: "Update access token successfully!",
      token: newToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while update access token!",
      error,
    });
  }
};

// Get All Users - Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      .select("-password -passwordResetToken -passwordResetTokenExpire");
    res.status(200).send({
      success: true,
      message: "Get all users successfully!",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get all users!",
      error,
    });
  }
};

// Get User by Id
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "User id is required!",
      });
    }

    const user = await userModel
      .findById(id)
      .select("-password -passwordResetToken -passwordResetTokenExpire");
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get user by id successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get user by id!",
      error,
    });
  }
};

// Update (Role)
export const updateUserRole = async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "User id is required!",
      });
    }
    if (!role) {
      return res.status(400).send({
        success: false,
        message: "Role is required!",
      });
    }

    const user = await userModel
      .findById(id)
      .select("-password -passwordResetToken -passwordResetTokenExpire");
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found!",
      });
    }

    user.role = role;

    await user.save();

    res.status(200).send({
      success: true,
      message: "Update user role successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while update user role!",
      error,
    });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "User id is required!",
      });
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found!",
      });
    }

    await userModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Delete user successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while delete user!",
      error,
    });
  }
};

// Reset Password Request
export const resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required!",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found, please check your email!",
      });
    }
    const token = createRandomToken();
    const expireIn = new Date() * 10 * 60 * 1000;
    await userModel.findByIdAndUpdate(user._id, {
      passwordResetToken: token,
      passwordResetTokenExpire: expireIn,
    });

    // Send Email to User
    const data = {
      user: { name: user.firstName + user.lastName },
      token,
    };

    await sendMail({
      email: user.email,
      subject: "Varification Email!",
      template: "reset_password.ejs",
      data,
    });

    res.status(200).send({
      success: true,
      message: "Please check your email to reset your password!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while reset password request!",
      error,
    });
  }
};

// Update Password
export const updatePassword = async (req, res) => {
  try {
    const { newPassword, token } = req.body;
    if (!newPassword) {
      return res.status(400).send({
        success: false,
        message: "Password is required!",
      });
    }
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "Token is required!",
      });
    }

    const user = await userModel.findOne({
      passwordResetToken: token,
      passwordResetTokenExpire: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid token or expired!",
      });
    }

    const hashPassword = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
      passwordResetToken: null,
      passwordResetTokenExpire: null,
    });

    res.status(200).send({
      success: true,
      message: "Update password successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while update password!",
      error,
    });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, gender, bio, location } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found!",
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.gender = gender;
    user.bio = bio;
    user.location = location;

    await user.save();

    res.status(200).send({
      success: true,
      message: "Update profile successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while update profile!",
      error,
    });
  }
};

// Update Profile, Cover Photo
export const updateProfileCoverPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { profilePicture, coverPhoto } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found!",
      });
    }

    user.coverPhoto = coverPhoto;
    user.profilePicture = profilePicture;

    await user.save();

    res.status(200).send({
      success: true,
      message: "Update profile cover photo successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while update profile cover photo!",
      error,
    });
  }
};
