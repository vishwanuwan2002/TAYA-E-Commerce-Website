const express = require("express");

const {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteItemFromCart,
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.post("/delete-item", deleteItemFromCart);

module.exports = router;