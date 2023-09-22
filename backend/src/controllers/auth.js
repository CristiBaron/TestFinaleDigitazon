import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10); // Genera un "salt" per l'hashing delle password
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // Esegui l'hashing della password dell'utente

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.cookie("jwt", token, { httpOnly: true });
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }); // Trova l'utente nel database
    if (!user) {
      return res
        .status(200)
        .send({ data: {}, error: true, message: "User not found" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(200)
        .send({ data: {}, error: true, message: "Wrong password or email" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.cookie("jwt", token, { httpOnly: true });

    res.status(200).send({
      message: "User logged in successfully",
      token: token,
      userID: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).send({ message: "User logged out successfully" });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};
