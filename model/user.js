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
    required: true,
  },
  cartItems: {
    type: [
      {
        slug: {
          type: String,
        },
        essentials: {
          Name: {
            type: String
          },
          quantity: {
            type: Number
          },
          size : {
            width: {
              type: Number
            },
            height: {
              type: Number
            },
          },
          total : {
            type: Number
          }
        }
      },
    ],
    default: [],
  },
  OrderHistory: {
    type: [
      {
        orderId: {
          type: String,
        },
        paymentMode: {
          type: String,
        },
        Delivered: {
          type: String,
        },
        itemId: {
          type: [
            {
              id: String,
              quantity: Number,
              size: {
                width: Number,
                height: Number,
              },
              paperPrice: {
                price: Number,
                Name: String
              }
            },
          ],
        },
      },
    ],
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
    default: "",
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
