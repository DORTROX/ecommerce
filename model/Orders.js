const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
  },
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
  created_at: {
    type: Date,
  },
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
