const productDatabase = require("../database/productDatabase");

async function getAllProducts() {
  return await productDatabase.getAllProducts();
}

async function getProductById(id) {
  return await productDatabase.getProductById(id);
}

async function createProduct(productData) {
  return await productDatabase.createProduct(productData);
}

async function updateProduct(id, updateData, isPartial = false) {
  return await productDatabase.updateProduct(id, updateData, isPartial);
}

async function deleteProduct(id) {
  return await productDatabase.deleteProduct(id);
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
