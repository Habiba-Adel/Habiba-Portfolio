const express = require("express");
const router = express.Router();
const { sendContactMessage } = require("../controllers/contactController");

// when sending the message
router.post("/", sendContactMessage);

module.exports = router;