import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const createSuperAdmin = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: "superadmin@gmail.com" });
    if (existingUser) {
      return;
    }
    const hashPassword = await bcrypt.hash(process.env.superAdminPassword, 10);
    const user = new User({
      name: "superadmin",
      email: "superadmin@gmail.com",
      password: hashPassword,
      role: "SuperAdmin",
      status: "active",
    });
    await user.save();
    console.log(`SuperAdmin created successfully`);
  } catch (error) {
    console.log(`Error creating SuperAdmin: ${error}`);
  }
};
export const registerUser = async (req, res) => {
  const { name, email, password, phone, role, status } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    const user = await User.findOne({ email });

    if (user) {
      if (user.status === "active")
        return res.status(409).json({
          success: false,
          message: "user is already registered",
        });
      if (user.status === "pending") {
        return res.status(404).json({
          success: false,
          message: "user is Pending, please contact admin or Verify your email",
        });
      }
    }
    const otp = Math.floor(1000 + Math.random() * 9999);

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      phone,
      role,
      status,
      otp,
      emailVerificationExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
    await newUser.save();
    const safeUser = {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      status: newUser.status,
    };
    res.status(201).json({
      success: true,
      message: "user registered successfully",
      data: safeUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `User registering server error ${error.message}`,
      data: error.message,
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    const user = await User.findOne({ email }).select("Password");
    if (!user)
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    if (user) {
      if (user.status === "pending")
        res.status(404).json({
          success: false,
          message: "user is Pending, please contact admin",
        });
      if (user.status === "inactive")
        return res.status(404).json({
          success: false,
          message: "user is inactive",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "password is incorrect",
      });
    const safeUser = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      permissions: user.permissions,
    };
    const accessToken = generateAccessToken({ user });
    const refreshToken = generateRefreshToken({ user });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: safeUser,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error occurred: ${error.message}`,
      data: error.message,
    });
  }
};
