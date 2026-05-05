const express = require("express");

const {
  getFilteredProducts_endpoint,
  getProductDetails,
} = require("../../controllers/shop/products-controller");

const router = express.Router();

router.get("/filter", getFilteredProducts_endpoint);
router.get("/get/:id", getProductDetails);

module.exports = router;