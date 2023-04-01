const userController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

router.post("/register", userController.create);
router.post("/login", userController.login);
router.post("/preferences", userController.changePrefs);
router.post("/favourites", userController.favourites)

module.exports = router;
