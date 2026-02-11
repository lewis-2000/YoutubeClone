const express = require("express");
const router = express.Router();
const mockDb = require("../models/mockDb");

// Home Tab
router.get("/home", async (req, res) => {
  const [rows] = await mockDb.query("SELECT * FROM videos WHERE category = ?", [
    "trending",
  ]);
  res.json(rows);
  console.log(rows);
});

// Subscriptions Tab
router.get("/subscriptions", async (req, res) => {
  const [rows] = await mockDb.query("SELECT * FROM videos WHERE category = ?", [
    "subscription",
  ]);
  res.json(rows);
  console.log(rows);
});

// "You" Tab (History)
router.get("/library", async (req, res) => {
  const [rows] = await mockDb.query("SELECT * FROM videos WHERE category = ?", [
    "history",
  ]);
  res.json(rows);
});

// Shorts
router.get("/shorts", async (req, res) => {
  const [rows] = await mockDb.query("SELECT * FROM videos WHERE category = ?", [
    "shorts",
  ]);
  res.json(rows);
});

module.exports = router;
