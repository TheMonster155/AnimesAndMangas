const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      mangaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manga",
      },
      actionFigureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ActionFigure",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },

  shippingAddress: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "canceled"],
    default: "pending",
  },
  paymentId: {
    type: String,
    required: false,
    default: null,
  },
  seller: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }],
});

module.exports = mongoose.model("Order", OrderSchema, "orders");
