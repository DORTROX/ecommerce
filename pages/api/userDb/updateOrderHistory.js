import { RazorpayInstance } from "@/lib/RazorPay";
import { connectMongo } from "@/lib/connectMongo";
import Orders from "@/model/Orders";
import User from "@/model/user";

async function searchByEmail(userp) {
  try {
    const user = await User.findOne({ email: userp.user.email });

    if (!user) {
      return false;
    }

    user.OrderHistory.push({orderId: userp.orderId, itemId: userp.itemId, Delivered: "Not Delivered"})
    user.cartItems = []
    await user.save();

    return true;
  } catch (err) {
    throw err; // Throw the error instead of returning it
  }
}

export default async function UpdateUser(req, res) {
    try {
      await connectMongo();
      
      const userExists = await searchByEmail(req.body);
      if (!userExists) {
        return res.status(400).json({ error: "LOL" });
      }
      const PayMode = await RazorpayInstance.payments.fetch(req.body.orderId)
      Orders.create({orderId: req.body.orderId, itemId : req.body.itemId, paymentMode: PayMode.method, Delivered: "Not Delivered", email: req.body.user.email, created_at: Date(PayMode.created_at)})
  
      res.send(200);
    } catch (err) {
      res.status(500).json({ error: err }); // Send an error response
    }
  }
  