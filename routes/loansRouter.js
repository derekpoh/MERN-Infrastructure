const express = require("express");
const router = express.Router();
const loansController = require("../controllers/loansController");

router.post("/", loansController.setReminder);

module.exports = router;