const productDatabase = require("../database/productDatabase");

async function getAllProducts() {
  return await productDatabase.getAllProducts();
}

async function getProductById(id) {
  return await productDatabase.getProductById(id);
}

module.exports = {
  getAllProducts,
  getProductById,
};
