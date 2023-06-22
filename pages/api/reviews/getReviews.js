const { connectMongo } = require("@/lib/connectMongo");
import User from "@/model/user";

async function searchUserByEmail(id) {
    const user = await User.findOne({ _id: id });
    if (user) {
      return user;
    } else {
      return false;
    }
}

export default async function UpdateCart(req, res) {
    const { id } = req.body;
    await connectMongo();
    const isUser = await searchUserByEmail(id);
    if (!isUser) return res.status(400).json({ error: "User not found." });
    return res.send(isUser);
}
