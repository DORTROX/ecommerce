import { connectMongo } from "@/lib/connectMongo";
import User from "@/model/user";

async function searchByEmail(userp) {
  try {
    const update = {
      $set: {
        name: userp.fullName,
        phone: userp.phone,
        email: userp.email,
        City: userp.City,
        Postal_Code: userp.pinCode,
        Shipping_Address: userp.fullAddress,
      },
    };
    const user = await User.findOneAndUpdate({ email: userp.email }, update);
    if (!user) {
      return false;
    }
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

    res.send(200)
  } catch (err) {
    res.status(500).json({ error: err }); // Send an error response
  }
}
