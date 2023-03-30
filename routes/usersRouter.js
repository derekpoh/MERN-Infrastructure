const userController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

router.post("/register", userController.create);
router.post("/login", userController.login);
router.get("/preferences", userController.showPrefs);
router.post("/preferences", userController.changePrefs);

module.exports = router;
