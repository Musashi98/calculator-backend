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
const CatchErrors_1 = __importDefault(require("../utils/CatchErrors"));
const numberRegex = /^[+-]?([0-9]*[.])?[0-9]+$/;
const usernameRegex = /^[a-zA-Z0-9_-]*$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]*$/;
const calculationQueryParams = (0, CatchErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { num1, num2, op } = req.query;
    if (!num1 ||
        !num2 ||
        !op ||
        !(typeof num1 === "string") ||
        !(typeof num2 === "string") ||
        !(typeof op === "string") ||
        !numberRegex.test(num1) ||
        !numberRegex.test(num2) ||
        !["add", "sub", "mult", "div"].includes(op)) {
        return res.status(400).json({
            message: "The data provided is not valid"
        });
    }
    next();
}));
const registerBody = (0, CatchErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username ||
        !email ||
        !password ||
        !(typeof username === "string") ||
        !(typeof email === "string") ||
        !(typeof password === "string") ||
        !usernameRegex.test(username) ||
        !emailRegex.test(email) ||
        !passwordRegex.test(password)) {
        return res.status(400).json({
            errorCode: 1,
            message: "The data provided is not valid"
        });
    }
    next();
}));
const loginBody = (0, CatchErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email ||
        !password ||
        !(typeof email === "string") ||
        !(typeof password === "string") ||
        !emailRegex.test(email) ||
        !passwordRegex.test(password)) {
        return res.status(400).json({
            errorCode: 1,
            message: "The data provided is not valid"
        });
    }
    next();
}));
const InputValidations = {
    calculationQueryParams,
    registerBody,
    loginBody
};
exports.default = InputValidations;
