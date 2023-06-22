const { connectMongo } = require("@/lib/connectMongo");
import User from "@/model/user";

async function searchUserByEmail(email, slug) {
    try {
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return false;
      }
  
      const existingItemIndex = user.cartItems.findIndex((item) => item.slug === slug);
  
      if (existingItemIndex !== -1) {
        // Item with the same slug already exists in the cartItems array
        
        user.cartItems.splice(existingItemIndex, 1);
        await user.save();
      } 
      return true;
    } catch (error) {
      // Handle error
      return error;
    }
  }


  export default async function RemoveFromCart(req, res) {
    try {
    const { email, slug } = req.body;
    await connectMongo();
    const isUser = await searchUserByEmail(email, slug);
    if (!isUser) return res.status(400).json({ error: "User not found." });
    res.status(200)
    } catch (err) {
      res.send(err)
    }
}
  