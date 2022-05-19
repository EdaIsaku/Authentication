const express = require("express");
const rootRouter = express.Router();
rootRouter.use(express.json());

const home = require("./home");
const allUsers = require("./users");
const findOne = require("./findOne");
const signIn = require("./signIn");
const signUp = require("./signUp");
const deleteOne = require("./deleteOne");
const deleteAll = require("./deleteAll");
const sendEmail = require("./sendEmail");
const upload = require("./upload");

rootRouter.use(home);
rootRouter.use(allUsers);
rootRouter.use(findOne);
rootRouter.use(signIn);
rootRouter.use(signUp);
rootRouter.use(deleteOne);
rootRouter.use(deleteAll);
rootRouter.use(sendEmail);
rootRouter.use(upload);

module.exports = rootRouter;
