const { register, login, reset,loginMiddleWare } = require("./controllers");

const express = require("express");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login",loginMiddleWare, login);
authRouter.post("/reset",loginMiddleWare, reset);

module.exports = { authRouter };