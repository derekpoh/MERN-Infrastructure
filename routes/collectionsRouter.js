const express = require("express");
const collectionsController = require("../controllers/collectionsController");
const router = express.Router();

router.get("/", collectionsController.index)
router.get("/:id", collectionsController.show);

module.exports = router;
