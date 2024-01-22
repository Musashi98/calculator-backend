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
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const DBAdapter_1 = __importDefault(require("./DBAdapter"));
dotenv_1.default.config();
const tokenKey = process.env.TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
const tokenExpiration = process.env.TOKEN_EXPIRATION || "10m";
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION || "20m";
const createUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let id = (0, crypto_1.randomUUID)();
    while ((yield DBAdapter_1.default.getUserById(id)) !== null) {
        id = (0, crypto_1.randomUUID)();
    }
    return {
        id,
        username,
        email,
        password: yield encryptPassword(password),
    };
});
const createToken = (username, email) => {
    const tokenBody = {
        username,
        email
    };
    const token = jsonwebtoken_1.default.sign({ user: JSON.stringify(tokenBody) }, tokenKey, { expiresIn: tokenExpiration });
    return token;
};
const createRefreshToken = (username, email) => {
    const tokenBody = {
        username,
        email
    };
    const token = jsonwebtoken_1.default.sign({ user: JSON.stringify(tokenBody) }, refreshTokenKey, { expiresIn: refreshTokenExpiration });
    return token;
};
const decodeToken = (token) => {
    return jsonwebtoken_1.default.verify(token, tokenKey);
};
const decodeRefreshToken = (refreshToken) => {
    return jsonwebtoken_1.default.verify(refreshToken, refreshTokenKey);
};
const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt_1.default.hash(password, 12);
    return hash;
});
const isValidPassword = (password, encrypted) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, encrypted);
});
const DBUtils = {
    createUser,
    createToken,
    createRefreshToken,
    encryptPassword,
    isValidPassword,
    decodeToken,
    decodeRefreshToken
};
exports.default = DBUtils;
