const userController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

router.post("/register", userController.create);
router.post("/login", userController.login);
router.post("/preferences", userController.changePrefs);
router.get("/account/favourites", userController.showFavourites);
router.post("/favourites/:id", userController.addFavourites);
router.delete("/favourites/:id", userController.deleteFavourites);

module.exports = router;
