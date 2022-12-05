import User from "../models/user.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
export const AuthController = {
  //Region get all user
  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json({
        success: true,
        message: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get all user",
      });
    }
  },

  //GET An USER
  getUserData: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json({
        success: true,
        id: user._id,
        username: user.username,
        phoneNumber: user.phoneNumber,
        gender: user.gender ?? "",
        dateOfBirth: user.dateOfBirth ?? "",
        address: user.address ?? "",
        point: user.point ?? 0,
        money: user.money ?? 0,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get an user",
      });
    }
  },

  //DELETE
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: User,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when delete user",
      });
    }
  },

  //UPDATE
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Update Successful!");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when update user",
      });
    }
  },

  //End region
  //Region add new user
  register: async (req, res) => {
    try {
      const data = new User({
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      await User.create(data);
      return res.status(200).json({ success: true, message: "User created" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //End region
  //Region login
  login: async (req, res) => {
    try {
      const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
      if (!user) {
        return res
          .status(202)
          .json({ success: false, message: "Phone number does not exist" });
      }
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return res
          .status(202)
          .json({ success: false, message: "Password is incorrect" });
      }
      const accessToken = jwt.sign(
        { phoneNumber: req.body.phoneNumber },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );

      const refreshToken = jwt.sign(
        {
          phoneNumber: req.body.phoneNumber,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      res.setHeader("Access-Token", accessToken);
      res.setHeader("Refresh-Token", refreshToken);
      return res.status(200).json({
        success: true,
        message: "Login success",
        id: user._id,
        username: user.username,
        phoneNumber: user.phoneNumber,
        gender: user.gender ?? "",
        dateOfBirth: user.dateOfBirth ?? "",
        address: user.address ?? "",
        point: user.point ?? 0,
        money: user.money ?? 0,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res
            .status(202)
            .json({ success: false, message: "User doesn't exists" });
        }

        const isMatchPassword = await bcrypt.compare(
          req.body.oldPassword,
          user.password
        );
        if (!isMatchPassword) {
          return res.status(202).json({
            success: false,
            message: "Incorrect password",
          });
        }

        await user.updateOne({
          $set: { password: bcrypt.hashSync(req.body.password, 10) },
        });

        return res
          .status(200)
          .json({ success: true, message: "Change password success" });
      }
      return res
        .status(202)
        .json({ success: false, message: "User doesn't exists" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  //End region
};
