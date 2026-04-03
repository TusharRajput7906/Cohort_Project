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
    if (cartItems.length === 0) {
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

export async function getSingleOrderController(req, res) {
  try {
    const orderId = req.params.id;
    const userId = req.user?.id || req.user?.user;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const order = await orderModel
      .findOne({
        _id: orderId,
        userId: userId,
      })
      .populate("products.productId");
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    res.status(200).json({
      message: "Order is here!",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

export async function updateOrderStatusController(req, res) {
  try {
    const orderId = req.params.id;
    const userId = req.user?.id || req.user?.user;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const { status } = req.body;
    const validStatus = ["pending", "completed", "cancelled"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }
    const order = await orderModel.findOneAndUpdate(
      { _id: orderId, userId },
      { status },
      { new: true },
    );
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    res.status(200).json({
      message: "Order status Updated",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

export async function deleteOrderController(req, res) {
  try {
    const orderId = req.params.id;
    const userId = req.user?.id || req.user?.user;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const order = await orderModel.findOneAndDelete({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order deleted",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}
