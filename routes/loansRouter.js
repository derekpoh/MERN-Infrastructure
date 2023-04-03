const express = require("express");
const router = express.Router();
const loansController = require("../controllers/loansController");

router.post("/setreminder", loansController.setReminder);
router.get("/:id", loansController.index)


module.exports = router;