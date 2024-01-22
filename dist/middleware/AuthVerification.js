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
const CatchErrors_1 = __importDefault(require("../utils/CatchErrors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const tokenKey = process.env.TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
const checkToken = (0, CatchErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationInfo = req.headers.authorization;
    if (!authorizationInfo || !(typeof authorizationInfo === "string")) {
        return res.status(401).json({
            message: "The authentication token is missing"
        });
    }
    const bearerText = authorizationInfo.split(" ")[0];
    const token = authorizationInfo.split(" ")[1];
    if (!bearerText || bearerText !== "Bearer") {
        return res.status(401).json({
            message: "The protocol is invalid"
        });
    }
    if (!token) {
        return res.status(401).json({
            message: "The authentication token is missing"
        });
    }
    jsonwebtoken_1.default.verify(token, tokenKey, (err, decodedToken) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(403).json({
                    message: "The authentication token has expired"
                });
            }
            return res.status(401).json({
                message: "The authentication token is not valid"
            });
        }
        req.body.decodedToken = decodedToken;
        next();
    });
}));
const checkRefreshToken = (0, CatchErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationInfo = req.headers.authorization;
    if (!authorizationInfo || !(typeof authorizationInfo === "string")) {
        return res.status(401).json({
            message: "The authentication refresh token is missing"
        });
    }
    const bearerText = authorizationInfo.split(" ")[0];
    const refreshToken = authorizationInfo.split(" ")[1];
    if (!bearerText || bearerText !== "Bearer") {
        return res.status(401).json({
            message: "The protocol is invalid"
        });
    }
    if (!refreshToken) {
        return res.status(401).json({
            message: "The authentication refresh token is missing"
        });
    }
    jsonwebtoken_1.default.verify(refreshToken, refreshTokenKey, (err, decodedToken) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "The authentication refresh token has expired"
                });
            }
            return res.status(401).json({
                message: "The authentication refresh token is not valid"
            });
        }
        req.body.decodedToken = decodedToken;
        next();
    });
}));
const AuthVerification = {
    checkToken,
    checkRefreshToken
};
exports.default = AuthVerification;
