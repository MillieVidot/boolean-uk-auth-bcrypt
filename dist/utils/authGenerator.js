"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// import {config} from "dotenv"
// config()
const SECRET = process.env.SECRET; // 'cast' instead of 'type' because we are certain
console.log("secret:", SECRET);
function createToken(payload) {
    return jsonwebtoken_1.default.sign(payload, SECRET);
}
exports.createToken = createToken;
function validateToken(token) {
    return jsonwebtoken_1.default.verify(token, SECRET);
}
exports.validateToken = validateToken;
