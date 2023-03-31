const express = require("express");
const collectionsController = require("../controllers/collectionsController");
const router = express.Router();

router.get("/:id", collectionsController.show);

module.exports = router;
