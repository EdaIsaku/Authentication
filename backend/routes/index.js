const express = require("express");
const rootRouter = express.Router();
rootRouter.use(express.json());

const home = require("./home");
const allUsers = require("./users");
const findOne = require("./findOne");
const signIn = require("./signIn");
const signUp = require("./signUp");
const sendEmail = require("./sendEmail");

rootRouter.use(home);
rootRouter.use(allUsers);
rootRouter.use(findOne);
rootRouter.use(signIn);
rootRouter.use(signUp);
rootRouter.use(sendEmail);

module.exports = rootRouter;
