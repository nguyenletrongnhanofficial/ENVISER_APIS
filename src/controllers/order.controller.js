import OrderModel from "../models/order.js";
import User from "../models/user.js";

export const OrderController = {
  //Region get all Order
  getAll: async (req, res) => {
    try {
     console.log(req.body);
      const Order = await OrderModel
       .find(req.body)
            
      console.log(Order);
      res.status(200).json({
        success: true,
        message: Order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get all Order",
      });
    }
  },

  //GET An Order
  get: async (req, res) => {
    try {
      const Order = await OrderModel.findById(req.params.id);
      res.status(200).json({
        success: true,
        message: Order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get an Order",
      });
    }
  },

  //DELETE
  delete: async (req, res) => {
    try {
      const order = await OrderModel.findById(req.params.id);

      const order_with_user = await order.populate('user');

      console.log(order);
      console.log(order_with_user);

      // const user = await User.findById(order_with_user.user._id);

      // console.log(user);

      // await user.update(
      //   {},
      //   { $pull: { orders: { _id: order._id } } }
      // );

      // await user.save();

      // await User.updateMany(
      //   {orders: order_with_user.user._id}, 
      //   {$pull : {orders: order_with_user.user._id}
      // }
      // );

      // order.remove();

      // await order.save();

      await OrderModel.findByIdAndDelete(req.params.id);
      

  
      res.status(200).json({
        success: true,
        message: OrderModel,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when delete Order",
      });
    }
  },

  //UPDATE
  update: async (req, res) => {
    try {
      const Order = await OrderModel.findById(req.params.id);
      await Order.updateOne({ $set: req.body });
      res.status(200).json("Update Successful!");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when update Order",
      });
    }
  },

  //End region
  //Region add new Order
  create: async (req, res) => {
    try {  
      const order = await OrderModel.create(req.body);
      //console.log(await order.populate('user'));

      const user = await User.findById(req.body.user);
      user.orders.push(order._id);

     // console.log(user);

      await user.save();

      //console.log(await user.populate('orders'));
   
      return res.status(200).json({  success: true, message: "Order created" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //End region
  
  //Region get orders of user
  getOrdersOfUser: async (req, res) => {
    try {  
 
      const user = await User.findById(req.params.id);
    
      const user_with_orders = await user.populate('orders')
      
      console.log(user_with_orders);

      return res.status(200).json({  
        success: true, 
        message: user_with_orders.orders 
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //end region
};
