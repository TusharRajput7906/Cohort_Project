import productModel from "../models/product.model.js";

export async function productCreateController(req, res) {
  try {
    const userId = req.user?.id || req.user?.user;
    const { productName, description, price } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    if (!productName || !description || price === undefined) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const product = await productModel.create({
      productName,
      description,
      price,
      userId,
    });

    res.status(201).json({
      message: "Product created Successfully",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
}

export async function getAllProductController(req, res) {
  try {
    const userId = req.user?.id || req.user?.user;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const products = await productModel.find({ userId });
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found",
      });
    }
    res.status(200).json({
      message: "Products fetched Successfully",
      products,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

export async function deleteProductController(req, res) {
  try {
    const userId = req.user?.id || req.user?.user;
    const productId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const product = await productModel.findOneAndDelete({
      _id: productId,
      userId,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

export async function updateProductController(req, res) {
  try {
    const userId = req.user?.id || req.user?.user;
    const productId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user"
      });
    }

    const { productName, description, price } = req.body;
    const update = {};
    if (productName !== undefined) update.productName = productName;
    if (description !== undefined) update.description = description;
    if (price !== undefined) update.price = price;

    const product = await productModel.findOneAndUpdate(
      { _id: productId, userId },
      update,
      { returnDocument: "after" }
    );

    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    res.status(200).json({
      message: "Product update Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}
