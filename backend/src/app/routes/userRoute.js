const express = require("express");
const router = express.Router();

const userControllers = require("./../controllers/userController");

router.post("/signup", userControllers.createUser);
router.post("/login", userControllers.loginUser);
router.get("/users", userControllers.getUsers);

module.exports = router;