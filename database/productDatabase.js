const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "..", "db.json");

async function readData() {
  const products = await fs.readFile(filePath, "utf-8");
  return JSON.parse(products);
}

async function writeData(products) {
  await fs.writeFile(filePath, JSON.stringify(products, null, 2), "utf-8");
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
  return products.find((item) => item.id === id) || null;
}

async function createProduct(productData) {
  const products = await readData();
  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = { id: newId, ...productData };
  products.push(newProduct);
  await writeData(products);
  return newProduct;
}

async function updateProduct(id, updateData, isPartial = false) {
  const products = await readData();
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  if (isPartial) {
    products[index] = { ...products[index], ...updateData, id };
  } else {
    products[index] = { id, ...updateData };
  }

  await writeData(products);
  return products[index];
}

async function deleteProduct(id) {
  const products = await readData();
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedProduct] = products.splice(index, 1);
  await writeData(products);
  return deletedProduct;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
