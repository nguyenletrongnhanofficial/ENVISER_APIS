import mongoose from "mongoose";

const garbage = new mongoose.Schema({
  url: {
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  type: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
});
const Garbage = mongoose.model("garbage", garbage, "garbage");
export default Garbage;
