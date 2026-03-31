import orderModel from "../models/order.model.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export async function createOrderController(req, res) {
  try {
    const userId = req.user?.id || req.user?.user;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const cartItems = await cartModel.find({ userId }).populate("productId");
    if (cartItems.length == 0) {
      return res.status(400).json({
        message: "Cart is Empty",
      });
    }
    let totalAmount = 0;
    const products = cartItems.map((item) => {
      if (!item.productId) {
        throw new Error("Product not found");
      }
      totalAmount += item.productId.price * item.quantity;

      return {
        productId: item.productId._id,
        quantity: item.quantity,
      };
    });
    let order = await orderModel.create({
      userId,
      products,
      totalAmount,
      status: "pending",
    });

    await cartModel.deleteMany({ userId });
    res.status(201).json({
      message: "Order placed Successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

export async function getOrderController(req, res) {
  try {
    const userId = req.user?.id || req.user?.user;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const orders = await orderModel
      .find({ userId })
      .populate("products.productId");
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        message: "No orders found",
      });
    }
    res.status(200).json({
      message: "Orders fetched successfully!",
      orders,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}
