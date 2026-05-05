const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  checkAuthStatus,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", checkAuthStatus);

module.exports = router;
