const userController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

router.post("/register", userController.create);
router.post("/login", userController.login);
router.post("/preferences", userController.changePrefs);
router.get("/:id/favourites", userController.showFavourites);

module.exports = router;
