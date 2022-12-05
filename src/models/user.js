import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  orders: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'order',
  }],
  challenges: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'challenge',
  }]
});
const User = mongoose.model("user", user, "user");
export default User;
