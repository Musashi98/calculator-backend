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
const DBUtils_1 = __importDefault(require("../db/DBUtils"));
const DBAdapter_1 = __importDefault(require("../db/DBAdapter"));
const login = (0, CatchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield DBAdapter_1.default.getUserByEmail(email);
    if (user === null) {
        return res.status(400).json({
            errorCode: 2,
            message: "No user with that email and password exist"
        });
    }
    if (!(yield DBUtils_1.default.isValidPassword(password, user.password))) {
        return res.status(400).json({
            errorCode: 2,
            message: "No user with that email and password exist"
        });
    }
    const newToken = DBUtils_1.default.createToken(user.username, user.email);
    const newRefreshToken = DBUtils_1.default.createRefreshToken(user.username, user.email);
    user.token = newToken;
    user.refreshToken = newRefreshToken;
    return res.status(200).json(Object.assign(Object.assign({}, user), { password: undefined }));
}));
const register = (0, CatchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = yield DBAdapter_1.default.getUserByEmail(email);
    if (user !== null) {
        return res.status(400).json({
            errorCode: 2,
            message: "The email is taken"
        });
    }
    const newUser = yield DBUtils_1.default.createUser(username, email, password);
    yield DBAdapter_1.default.addUser(newUser);
    const newToken = DBUtils_1.default.createToken(newUser.username, newUser.email);
    const newRefreshToken = DBUtils_1.default.createRefreshToken(newUser.username, newUser.email);
    newUser.token = newToken;
    newUser.refreshToken = newRefreshToken;
    return res.status(200).json(Object.assign(Object.assign({}, newUser), { password: undefined }));
}));
const refreshToken = (0, CatchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { decodedToken } = req.body;
    const userData = JSON.parse(decodedToken.user);
    const token = DBUtils_1.default.createToken(userData.username, userData.email);
    const refreshToken = DBUtils_1.default.createRefreshToken(userData.username, userData.email);
    return res.status(200).json({
        token,
        refreshToken
    });
}));
const AuthController = {
    login,
    register,
    refreshToken
};
exports.default = AuthController;
