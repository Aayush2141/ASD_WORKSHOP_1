const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { cacheMiddleware } = require("../middleware/cacheMiddleware");
const invalidateCacheMiddleware = require("../middleware/invalidateCacheMiddleware");

router.get("/", cacheMiddleware, productController.getAllProducts);
router.get("/:id", cacheMiddleware, productController.getProductById);

router.post("/", invalidateCacheMiddleware, productController.createProduct);
router.put("/:id", invalidateCacheMiddleware, productController.updateProduct);
router.patch("/:id", invalidateCacheMiddleware, productController.partialUpdateProduct);
router.delete("/:id", invalidateCacheMiddleware, productController.deleteProduct);

module.exports = router;