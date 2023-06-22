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
  OrderHistory: {
    type: [
      {
        orderId: {
          type: String,
        }, paymentMode: {
          type: String,
        }, 
        Delivered: {
          type: String,
        },
        itemId: {
          type: String,
        }}
      ]
  },

  City: {
    type: String,
    default: "",
  },
  Postal_Code: {
    type: String,
    default: "",
  },
  Shipping_Address: {
    type: String,
    default: ""
  }
}); 

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
