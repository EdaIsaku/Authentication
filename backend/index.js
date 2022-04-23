const express = require("express");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const client = require("../db/db");
const db = client.db("authentication");
const collection = db.collection("users");

const salt = bcrypt.genSaltSync(process.env.SALT);

const { sendEmail } = require("./sendEmail");

const hashPass = (password) => {
  return bcrypt.hashSync(password, salt);
};

app.get("/", (req, res) => {
  res.send("Hello from route!");
});

app.post("/allUsers", async (req, res) => {
  const result = await collection.find().toArray();
  res.status(201).send({ result });
});

app.post("/findOne", async (req, res) => {
  const { email } = req.body;
  await collection.emai;
  sendEmail("edaisaku0@gmail.com");
  const result = await collection.findOne({ email });
  if (result) {
    res.status(201).send(result);
  } else {
    res.status(400).send({ msg: "No user registered!" });
  }
});

app.post("/signUp", async (req, res) => {
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

app.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  const result = await collection.findOne({ email });
  if (result) {
    if (bcrypt.compareSync(password, result.password)) {
      res.status(201).send({ msg: "Successfully loged In" });
    } else {
      res.status(400).send({ mg: "Password incorrect!" });
    }
  } else {
    res.status(400).send({ msg: "No user with that email" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

// process.on("SIGINT", function () {
//   client.close(() => {
//     console.log("MongoDb disconnected on app termination");
//     process.exit(0);
//   });
// });
