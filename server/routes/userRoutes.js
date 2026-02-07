const express = require("express");
const router = express.Router();

router.get("/", () => {
  console.log("Users");
});

module.exports = router;
