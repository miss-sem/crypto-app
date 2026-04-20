const express = require("express");
const router = express.Router();
const { register, login, profile, logout } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.get("/register", register);
router.get("/login", login);
router.get("/profile", protect, profile);
router.get("/logout", logout);

module.exports = router;
