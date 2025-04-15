const express = require("express");
const router = express.Router();
const { getLogoutView, killAplication } = require("../controllers/logoutController");

router.get("/", getLogoutView);
router.get("/kill", killAplication);

module.exports = router;

