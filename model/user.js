const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: true
  },
  cartItems: {
    type: [
      {
        slug: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    default: [],
  },
}); 

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
