import mongoose from "mongoose";

const challenge = new mongoose.Schema({
    imageUrl : {
        type: String,
    },
    title: {
        required: true,
        type: String,
      },
    description:{
        required: true,
        type: String,
      },
    maximumParticipants:{
        require: true,
        type: Number,
    },
    address:{
        required: true,
        type: String,
    },
    startTime: {  
        type: Number,
        required: true,
    },
    endTime: {  
        type: Number,
        required: true,
    },
    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
    },
    participants: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
    }],
    images: [{
        type: String,
    }]
});
const Challenge = mongoose.model("challenge", challenge, "challenge");
export default Challenge;
