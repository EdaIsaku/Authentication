const express = require("express");
const router = express.Router();
router.use(express.json());

const client = require("../../db/db");
const db = client.db("authentication");
const collection = db.collection("users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  const result = await collection.findOne({ email });
  if (result) {
    if (bcrypt.compareSync(password, result.password)) {
      const user = {
        email,
      };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.status(201).send({ msg: "Successfully loged In", accessToken });
    } else {
      res.status(400).send({ msg: "Password incorrect!" });
    }
  } else {
    res.status(400).send({ msg: "No user with that email" });
  }
});

module.exports = router;
