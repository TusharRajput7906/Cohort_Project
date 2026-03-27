import cardModel from "../models/card.model.js";

export async function addToCartController(req, res) {
  try {
    const userId = req.user?.id || req.user?.user;
    const { productId, quantity } = req.body;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const cart = await cardModel.create({
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
    const cartItems = await cardModel.find({ userId });
    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Card is Empty",
      });
    }

    res.status(200).json({
      message: "Card items are here!",
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
    const item = await cardModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Remove the item form cart",
      item,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}
