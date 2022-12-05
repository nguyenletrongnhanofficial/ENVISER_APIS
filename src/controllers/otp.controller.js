import client from "twilio";
import dotenv from "dotenv";
import Otp from "../models/otp.js";
import User from "../models/user.js";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const SMSclient = new client(accountSid, authToken);

export const OtpController = {
  sendOtp: async (req, res) => {
    try {
      const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
      console.log(user);
      if (user) {
        return res
          .status(202)
          .json({ success: false, message: "Phone number already exists" });
      }
      console.log("zo");
      const { phoneNumber } = req.body;
      const otp = Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000;
      const data = new Otp({ otp: otp, phoneNumber: phoneNumber });
      console.log(data);

      // save otp to db
      await data.save();
      const message = await SMSclient.messages.create({
        body: "Your OTP is: " + otp,
        from: "+16402249713",
        to: phoneNumber,
      });
      console.log(message.sid);
      res.status(200).json({
        success: true,
        message: "OTP sent",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const { phoneNumber, otp } = req.body;
      const user = await Otp.findOne({ phoneNumber: phoneNumber });
      console.log(user);
      if (user.otp == otp) {
        await Otp.deleteOne({ phoneNumber: phoneNumber });

        res.status(200).json({
          success: true,
          message: "OTP verified",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "OTP not match",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
};
