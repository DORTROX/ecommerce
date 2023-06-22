const { connectMongo } = require("@/lib/connectMongo");
import User from "@/model/user";

async function searchUserByEmail(email, slug, quantity) {
    try {
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return false;
      }

      const existingItemIndex = user.cartItems.findIndex((item) => item.slug === slug);

      if (existingItemIndex !== -1) {
        // Item with the same slug already exists in the cartItems array
        user.cartItems[existingItemIndex].quantity += quantity;
      } else {
        user.cartItems.push({ slug: slug, quantity: quantity });
      }
      await user.save();
      return true;
    } catch (error) {
      // Handle error
      return err;
    }
  }
  
  export default async function UpdateCart(req, res) {
    try {
    const { email, slug, quantity } = req.body;
    await connectMongo();
    const isUser = await searchUserByEmail(email, slug, quantity);
    if (!isUser) return res.status(400).json({ error: "User not found." });
    res.status(200)
    } catch (err) {
      res.send(err)
    }
  }
  
