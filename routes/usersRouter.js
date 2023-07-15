const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/users-controller");
const { validateToken } = require("../middleware/validate-token-handler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;