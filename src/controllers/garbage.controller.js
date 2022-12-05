import Garbage from "../models/garbage.js";

export const GarbageController = {
  //Region get all Garbage
  getAllGarbage: async (req, res) => {
    console.log("get all");
    try {
      const garbage = await Garbage.find();
      console.log(garbage);
      res.status(200).json(
        
         garbage,
    );
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get all Garbage",
      });
    }
  },

  //GET An Garbage
  getGarbage: async (req, res) => {
    try {
      const garbage = await Garbage.findById(req.params.id);
      res.status(200).json({
        success: true,
        message: garbage,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get an Garbage",
      });
    }
  },

  //DELETE
  deleteGarbage: async (req, res) => {
    try {
      await Garbage.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: Garbage,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when delete Garbage",
      });
    }
  },

  //UPDATE
  updateGarbage: async (req, res) => {
    try {
      const garbage = await Garbage.findById(req.params.id);
      await garbage.updateOne({ $set: req.body });
      res.status(200).json("Update Successful!");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when update Garbage",
      });
    }
  },

  //End region
  //Region add new Garbage
  createGarbage: async (req, res) => {
    try {
      const garbage = await Garbage.create(req.body);
      return res
        .status(200)
        .json({ success: true, message: "Garbage created", data: garbage });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //End region
};
