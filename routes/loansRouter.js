const express = require("express");
const router = express.Router();
const loansController = require("../controllers/loansController");

router.post("/setreminder", loansController.setReminder);
router.get("/:id", loansController.index);
router.get("/:id/history", loansController.history)


module.exports = router;