const { connectMongo } = require("@/lib/connectMongo");
import User from "@/model/user";

async function searchUserByEmail(email, slug, essentials) {

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return false;
    }

    const existingItemIndex = user.cartItems.findIndex(
      (item) =>
        item.slug === slug &&
        item.essentials.size.width === essentials.essentials.size.width &&
        item.essentials.size.height === essentials.essentials.size.height &&
        item.essentials.Name === essentials.essentials.Name
    );

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
    const { email, slug, essentials } = req.body;
    await connectMongo();
    const isUser = await searchUserByEmail(email, slug, essentials);
    if (!isUser) return res.status(400).json({ error: "User not found." });
    res.status(200);
  } catch (err) {
    res.send(err);
  }
}
