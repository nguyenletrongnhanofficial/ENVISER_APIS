import mongoose from "mongoose";
import User from "./user.js";

const order = new mongoose.Schema({
  time: {
    required: true,
    type: String,
  },
  startDate: {  
    type: Number,
    required: true,
  },
  endDate :{  
    type: Number,
    required: true,
  },
  status: {
    required: true,
    type: String,
  },
  type :{
    required: true,
    type: String,
  },
  address :{
    required: true,
    type: String,
  },
  user : { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user' 
  },
});

const Order = mongoose.model("order", order, "order");
export default Order;
