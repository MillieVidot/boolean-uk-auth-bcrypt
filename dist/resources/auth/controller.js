"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const service_1 = __importDefault(require("./service"));
const authGenerator_1 = require("../../utils/authGenerator");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreds = req.body;
    try {
        const loggedUser = yield service_1.default(userCreds);
        const token = authGenerator_1.createToken({
            id: loggedUser.id,
            username: loggedUser.username,
        });
        console.log("token:", token);
        res.cookie("token", token, { httpOnly: true }); //creates cookie and stops browser acess to cookie (options)
        // use {credentials: "include"} in every fetch 2nd arg (options) for httpOnly cookie.
        res.json({ user: { username: loggedUser.username } }); //sending info to front end
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
