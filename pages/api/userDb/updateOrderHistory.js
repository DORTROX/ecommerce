import { RazorpayInstance } from "@/lib/RazorPay";
import { connectMongo } from "@/lib/connectMongo";
import Orders from "@/model/Orders";
import User from "@/model/user";

async function searchByEmail(userp) {
  try {
    const user = await User.findOne({ email: userp.user.email });
    const cartToEmpty = await user.cartItems.map((item) => ({
      id: item.slug,
      size: { width: item.essentials.size.width, height: item.essentials.size.height },
      quantity: item.essentials.quantity,
      paperPrice: { Name: item.essentials.Name },
    }))

    if (!user) {
      return false;
    }

    user.OrderHistory.push({orderId: userp.orderId, itemId: cartToEmpty, Delivered: "Not Delievered"})
    Orders.create({orderId: userp.orderId, itemId : cartToEmpty, paymentMode: cartToEmpty.payMethod, Delivered: "Not Delivered", email: userp.user.email, created_at: Date()})
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
        return res.status(400).json({ error: "User not foudn" });
      }
      res.send(200);
    } catch (err) {
      console.log(err)
      res.status(200).json({ error: err }); // Send an error response
    }
  }
  