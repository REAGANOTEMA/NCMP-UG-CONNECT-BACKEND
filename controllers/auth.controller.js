import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      phone,
      district,
      region,
      constituency,
      nationalId
    } = req.body;

    const fullName = `${firstName || ""} ${lastName || ""}`.trim();

    if (!email || !password || !firstName) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || "citizen",
      phone,
      district,
      region,
      constituency,
      nationalId
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token
    });

  } catch (err) {

    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
};



export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      user,
      token
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
};



export const getProfile = async (req, res) => {
  try {

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json(user);

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
};