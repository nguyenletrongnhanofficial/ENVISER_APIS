import mongoose from "mongoose";

const otp = new mongoose.Schema({
  phoneNumber: {
    required: true,
    type: String,
  },
  otp: {
    required: true,
    type: String,
  },
});
const Otp = mongoose.model("otp", otp, "otp");
export default Otp;
