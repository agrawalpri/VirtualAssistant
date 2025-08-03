import genToken from "../config/token.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existEmail = await User.findOne({ email });
    if (existEmail)
      return res.status(400).json({ message: "Email already exists" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      password: hashedPass,
      email,
    });
    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
      sameSite: "strict",
      secure: false,
    });
    return res.status(201).json(user);
  } catch (error) {
    // console.log("Error in signUp");
    return res.status(500).json({ message: `Sign Up error ${error}` });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
      sameSite: "strict",
      secure: false,
    });
    return res.status(200).json(user);
  } catch (error) {
    // console.log("Error in signUp");
    return res.status(500).json({ message: `Login error ${error}` });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error ${error}` });
  }
};
