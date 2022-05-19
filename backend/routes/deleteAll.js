const express = require("express");
const router = express.Router();

const client = require("../../db/db");
const db = client.db("authentication");
const collection = db.collection("users");

router.post("/deleteAll", async (req, res) => {
  await collection.deleteMany({});
  res.status(201).send({ msg: "All users deleted!" });
});

module.exports = router;
