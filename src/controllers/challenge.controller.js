import ChallengeModel from "../models/challenge.js";
import User from "../models/user.js";

export const ChallengeController = {
  //Region get all Challenge
  getAll: async (req, res) => {
    try {
     console.log(req.body);
      const Challenge = await ChallengeModel
       .find(req.body)
            
      console.log(Challenge);
      res.status(200).json(
           Challenge,
      );
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get all Challenge",
      });
    }
  },

  //GET An Challenge
  get: async (req, res) => {
    try {
      const Challenge = await ChallengeModel.findById(req.params.id);
      res.status(200).json({
        success: true,
        message: Challenge,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get an Challenge",
      });
    }
  },

  //DELETE
  delete: async (req, res) => {
    try {
      await ChallengeModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: ChallengeModel,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when delete Challenge",
      });
    }
  },

  //UPDATE
  update: async (req, res) => {
    try {
      const Challenge = await ChallengeModel.findById(req.params.id);
      await Challenge.updateOne({ $set: req.body });
      res.status(200).json("Update Successful!");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when update Challenge",
      });
    }
  },

  //End region
  //Region add new Challenge
  create: async (req, res) => {
    try {  
      await ChallengeModel.create(req.body);
  
      return res.status(200).json({  success: true, message: "Challenge created" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //End region
  
  //Region join Challenge
  join: async (req, res) => {
    try {  
      const challenge = await ChallengeModel.findById(req.params.id);
      challenge.participants.push(req.body.userId);

      await challenge.save();

      const user = await User.findById(req.body.userId);
      user.challenges.push(req.params.id);
      

      await user.save();
  
      return res.status(200).json({  success: true, message: "Join Challenge" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //End region

  //Region leave Challenge
  leave: async (req, res) => {
    try {  
      console.log(req.params.id + " " + req.body.userId);

      await ChallengeModel.update(
         { _id : req.params.id }, 
         { $pull: { participants: req.body.userId }
      } );
      
      await User.update(
        { _id : req.body.userId }, 
        { $pull: { challenges: req.params.id }
     } );
  
      return res.status(200).json({  success: true, message: "Leave Challenge" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //End region

  getParticipantsOfChallenge: async (req, res) => {
    try {  
      console.log("aaaa");

      const challenge = await ChallengeModel.findById(req.params.id);
      
      

      const challege_with_participants = await challenge.populate('participants');
      
      console.log(challege_with_participants);
      
      return res.status(200).json({  
        success: true, 
        message: challege_with_participants.participants
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //end region

  //Region get Challenges of user
  getWithUser: async (req, res) => {
    try {  

      const user = await User.findById(req.params.id);
      

      const user_with_challenge = await user.populate('challenges');
      
      console.log(user_with_challenge);
      
      return res.status(200).json({  
        success: true, 
        message: user_with_challenge.challenges,
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //end region
};
