"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const InputValidations_1 = __importDefault(require("../middleware/InputValidations"));
const AuthVerification_1 = __importDefault(require("../middleware/AuthVerification"));
const AuthRouter = express_1.default.Router();
AuthRouter.post("/login", InputValidations_1.default.loginBody, AuthController_1.default.login);
AuthRouter.post("/register", InputValidations_1.default.registerBody, AuthController_1.default.register);
AuthRouter.get("/refresh", AuthVerification_1.default.checkRefreshToken, AuthController_1.default.refreshToken);
exports.default = AuthRouter;
