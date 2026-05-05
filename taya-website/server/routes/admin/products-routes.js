const express = require("express");

const {
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");
const { requireAuth, requireAdmin } = require("../../middleware/auth-middleware");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.post("/add", upload.none(), addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

router.post("/", upload.none(), addProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);
router.get("/", fetchAllProducts);

module.exports = router;