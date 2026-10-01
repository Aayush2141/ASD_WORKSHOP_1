const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "..", "db.json");

async function readData() {
  const products = await fs.readFile(filePath, "utf-8");
  return JSON.parse(products);
}

async function delayReadFile() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await readData();
}

async function getAllProducts() {
  return await delayReadFile();
}

async function getProductById(id) {
  const products = await delayReadFile();
  return products.find((item) => item.id === id);
}

module.exports = {
  getAllProducts,
  getProductById,
};
