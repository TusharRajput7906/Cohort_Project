import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export async function addToCartController(req, res) {
  try {
    const userId = req.user?.id || req.user?.user;
    const { productId, quantity } = req.body;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    // Validate productId exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found. Cannot add to cart."
      });
    }
    const cart = await cartModel.create({
      userId,
      productId,
      quantity,
    });
    res.status(201).json({
      message: "Product add to Cart",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

export async function getCartController(req, res) {
  try {
    const userId = req.user?.id || req.user?.user;
    // Populate productId to get product details (including price)
    const cartItems = await cartModel.find({ userId }).populate("productId");
    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is Empty",
      });
    }

    res.status(200).json({
      message: "Cart items are here!",
      cartItems,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

export async function removeCartItemController(req, res) {
  try {
    const userId = req.user?.id || req.user?.user;
    const id = req.params.id;
    if (!userId) {
      return res.status(400).json({
        message: "Unauthorized user",
      });
    }
    const item = await cartModel.findOneAndDelete({
      _id:id,
      userId:userId
    });

    res.status(200).json({
      message: "Remove the item from cart",
      item,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}
