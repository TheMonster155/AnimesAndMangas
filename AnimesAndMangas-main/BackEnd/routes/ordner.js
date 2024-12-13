const express = require("express");
const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);
const orderModel = require("../modules/orderSchema");
const userModel = require("../modules/user");

const mangaModel = require("../modules/manga");

const orders = express.Router();

orders.post("/order/create-order", async (req, res, next) => {
  const { userId, items, shippingAddress } = req.body;
  console.log("Request body:", req.body);
  try {
    console.log("Shipping address:", shippingAddress);
    const user = await userModel.findById(userId);
    if (!user) {
      const error = new Error("User not found.");
      error.status = 404;
      return next(error);
    }

    const { name, city, postalCode, country, address } = shippingAddress;
    if (!name || !city || !postalCode || !country || !address) {
      const error = new Error("Invalid shipping address.");
      error.status = 400;
      return next(error);
    }

    let totalPrice = 0;
    for (const item of items) {
      if (item.mangaId) {
        const manga = await mangaModel.findById(item.mangaId);
        if (!manga) {
          const error = new Error(`Manga with ID ${item.mangaId} not found.`);
          error.status = 404;
          return next(error);
        }
        if (manga.availability < item.quantity) {
          const error = new Error(
            `Insufficient quantity available for manga ${manga.name}.`
          );
          error.status = 400;
          return next(error);
        }
        totalPrice += item.quantity * item.price;
      }

      if (item.actionFigureId) {
        const actionFigure = await actionFigureModel.findById(
          item.actionFigureId
        );
        if (!actionFigure) {
          const error = new Error(
            `Action figure with ID ${item.actionFigureId} not found.`
          );
          error.status = 404;
          return next(error);
        }
        if (actionFigure.availability < item.quantity) {
          const error = new Error(
            `Insufficient quantity available for action figure ${actionFigure.name}.`
          );
          error.status = 400;
          return next(error);
        }
        totalPrice += item.quantity * item.price;
      }
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100),
      currency: "eur",
      payment_method_types: ["card"],
    });

    console.log("PaymentIntent client_secret:", paymentIntent.client_secret);

    for (const item of items) {
      if (item.mangaId) {
        const manga = await mangaModel.findById(item.mangaId);
        manga.availability -= item.quantity;
        await manga.save();
      }
      if (item.actionFigureId) {
        const actionFigure = await actionFigureModel.findById(
          item.actionFigureId
        );
        actionFigure.availability -= item.quantity;
        await actionFigure.save();
      }
    }

    const newOrder = new orderModel({
      userId,
      items,
      totalPrice,
      shippingAddress,
      status: "pending",
      paymentId: paymentIntent.id,
    });
    const orderUser = await newOrder.save();
    console.log("Nuovo ordine:", newOrder);

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $push: { orders: orderUser._id } },
      { new: true }
    );

    if (!updatedUser) {
      const error = new Error(
        "User not found, but order was successfully created."
      );
      error.status = 404;
      return next(error);
    }

    res.status(201).json({
      message: "Order created successfully.",
      order: newOrder,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    if (error.type === "StripeCardError") {
      error.status = 400;
      return next(error);
    }
    console.error("Errore nel backend:", error);
    next(error);
  }
});

orders.get("/order", async (req, res, next) => {
  try {
    const allOrders = await orderModel.find();
    res.status(200).json(allOrders);
  } catch (error) {
    next(error);
  }
});

orders.get("/order/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await orderModel.findById(id);
    if (!order) {
      const error = new Error("Order not found.");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

orders.patch("/order/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedOrder) {
      const error = new Error("Order not found.");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

orders.delete("/order/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedOrder = await orderModel.findByIdAndDelete(id);
    if (!deletedOrder) {
      const error = new Error("Order not found.");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    next(error);
  }
});

module.exports = orders;
