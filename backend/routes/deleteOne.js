const express = require("express");
const router = express.Router();

const client = require("../../db/db");
const db = client.db("authentication");
const collection = db.collection("users");

router.post("/deleteOne", async (req, res) => {
  const { email } = req.body;
  const userExist = await collection.findOne({ email });
  if (!userExist) {
    res.status(404).send({ msg: "User not found!" });
  } else {
    await collection.deleteOne({ email });
    res.status(201).send({ msg: "User deleted!" });
  }
});

module.exports = router;
