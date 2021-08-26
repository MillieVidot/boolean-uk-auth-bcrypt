"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const authRouter = express_1.Router();
// log in
authRouter.route("/login").post(controller_1.loginUser);
//log out
exports.default = authRouter;
