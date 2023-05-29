const { connectMongo } = require("@/utils/connectMongo");
import User from "@/model/user";

async function searchUserByEmail(name) {
  try {
    try {
      const user = await User.findOne({ name });
      if (user) {
        return user;
        // Handle user found
      } else {
        return false;
        // Handle user not found
      }
    } catch (err) {
      return err;
    }
  } catch (error) {
    console.error("Error searching for user:", error);
    // Handle error
  }
}
export default async function addTest(req, res) {
  try {
    const { name, email, image } = req.body;
    await connectMongo();
    const isUser = await searchUserByEmail(name);
    if (isUser) {
      return res.send(isUser);
    } else {
      const newUser = new User({
        name: name,
        email: email,
        image: image,
      });
      newUser.save();
    }
    res.json(200);
  } catch (err) {
    res.send(err);
  }
}
