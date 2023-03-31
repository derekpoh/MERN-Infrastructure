const express = require("express");
const searchesController = require("../controllers/searchesController");
const router = express.Router();

router.get("/", searchesController.search);

module.exports = router;
