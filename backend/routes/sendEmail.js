const express = require("express");
const router = express.Router();
router.use(express.json());

const { sendEmail } = require("../sendEmail");

router.post("/sendEmail", async (req, res) => {
  const { email } = req.body;
  sendEmail(email);
  res.status(200).send({ msg: "Email sent" });
});

module.exports = router;
