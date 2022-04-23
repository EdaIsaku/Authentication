const express = require("express");
const router = express.Router();
router.use(express.json());

const client = require("../../db/db");
const db = client.db("authentication");
const collection = db.collection("users");

router.get("/allUsers", async (req, res) => {
  const result = await collection.find().toArray();
  res.status(201).send({ result });
});

module.exports = router;
