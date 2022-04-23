const express = require("express");
const router = express.Router();

const client = require("../../db/db");
const db = client.db("authentication");
const collection = db.collection("users");

router.post("/findOne", async (req, res) => {
  const { email } = req.body;
  await collection.emai;
  const result = await collection.findOne({ email });
  if (result) {
    res.status(201).send(result);
  } else {
    res.status(400).send({ msg: "No user registered!" });
  }
});

module.exports = router;
