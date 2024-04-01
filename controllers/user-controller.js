import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//  const jwtKey = "secret123";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    res.status(400).json({ message: "User already exist! Login" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  // res.status(200).json(user);
  const token = jwt.sign({ user }, "secret123");
  return res.status(200).json({ user, auth: token });
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    res.status(404).json({ message: "User not found. SignUp" });
  }
  //compare password
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  const token = jwt.sign({ existingUser }, "secret123");
  return res.status(200).json({ existingUser, auth: token });
};


