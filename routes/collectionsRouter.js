const express = require("express");
const collectionsController = require("../controllers/collectionsController");
const router = express.Router();

router.get("/", collectionsController.index);
router.get("/:id", collectionsController.show);
router.get("/:id/recommended", collectionsController.recommended);
router.get("/:id/loans", collectionsController.loans);
router.post("/:id/borrow", collectionsController.borrowBook);
router.post("/:id/return", collectionsController.returnBook);

module.exports = router;
