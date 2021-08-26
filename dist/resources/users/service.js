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
exports.create = void 0;
const database_1 = __importDefault(require("../../utils/database"));
const bcrypt_1 = require("bcrypt");
const create = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const plaintext = newUser.password;
    const hashedPassword = yield bcrypt_1.hash(plaintext, 10);
    const savedUser = yield database_1.default.user.create({
        data: Object.assign(Object.assign({}, newUser), { password: hashedPassword }),
    });
    return savedUser;
});
exports.create = create;
const userClient = Object.assign(Object.assign({}, database_1.default.user), { create: exports.create });
exports.default = userClient;
// new create function replaces old create.
// Includes dbClient so all methods too.
