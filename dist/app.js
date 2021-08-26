"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./resources/users/router"));
const router_2 = __importDefault(require("./resources/auth/router"));
const authGenerator_1 = require("./utils/authGenerator");
const cors_1 = __importDefault(require("cors"));
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express_1.default();
// middlewares
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(cookieParser());
app.use(cors_1.default({ origin: "http://localhost:3001", credentials: true })); //url of front end
// app routes
app.use(router_2.default);
app.use((req, res, next) => {
    const token = req.cookies.token;
    console.log("cookie", req.cookies);
    const userData = authGenerator_1.validateToken(token); //returns object
    console.log("userData", userData);
    if (userData) {
        req.currentUser = userData; // CREATES NEW PROPERTY in req
        next(); //here
    }
    else {
        res.status(401).json({ err: "you need to be logged in mate" });
    }
}); // middleware. 'next()' continues route.
app.use("/users", router_1.default);
//routes
app.all("*", (req, res) => {
    res.status(404).json("No routes match!");
});
module.exports = app;
