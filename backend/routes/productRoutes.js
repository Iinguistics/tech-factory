const express = require('express');
const router = express.Router();
const { getProducts, getProductById, deleteProduct, createProduct, editProduct, createProductReview } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMilldeWare');


router.get("/", getProducts);
router.get("/:id", getProductById );
router.delete("/remove/:id", protect,admin, deleteProduct);
router.post("/", protect,admin, createProduct);
router.put("/edit/:id", protect,admin, editProduct);
router.post("/:id/reviews", protect, createProductReview);



module.exports = router;