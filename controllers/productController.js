const productService = require("../services/productService");

async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to read products" });
  }
}

async function getProductById(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ error: "Failed to read product" });
  }
}

async function createProduct(req, res) {
  try {
    const { name, price } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ error: "Product name and price are required" });
    }

    const newProduct = await productService.createProduct({
      name,
      price: Number(price),
    });

    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
}

async function updateProduct(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const { name, price } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ error: "Product name and price are required for full update" });
    }

    const updatedProduct = await productService.updateProduct(id, {
      name,
      price: Number(price),
    }, false);

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
}

async function partialUpdateProduct(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const updateData = {};
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.price !== undefined) updateData.price = Number(req.body.price);

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "At least one field (name or price) is required to patch" });
    }

    const updatedProduct = await productService.updateProduct(id, updateData, true);

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error partially updating product:", err);
    res.status(500).json({ error: "Failed to patch product" });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const deletedProduct = await productService.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  partialUpdateProduct,
  deleteProduct,
};
