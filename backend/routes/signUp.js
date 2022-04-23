const express = require("express");
const router = express.Router();
router.use(express.json());
const client = require("../../db/db");
const db = client.db("authentication");
const collection = db.collection("users");

const bcrypt = require("bcryptjs");
const hashPass = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

router.post("/signUp", async (req, res) => {
  let { name, email, password } = req.body;
  const hashedPassword = hashPass(password);
  password = hashedPassword;
  const user = {
    name,
    email,
    password,
  };
  await collection.insertOne(user);
  res.status(200).send({ msg: "Successfully registered!" });
});

module.exports = router;
