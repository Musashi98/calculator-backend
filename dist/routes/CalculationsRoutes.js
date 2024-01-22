"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CalculationsController_1 = __importDefault(require("../controllers/CalculationsController"));
const InputValidations_1 = __importDefault(require("../middleware/InputValidations"));
const AuthVerification_1 = __importDefault(require("../middleware/AuthVerification"));
const CalculationsRouter = express_1.default.Router();
CalculationsRouter.get("/", AuthVerification_1.default.checkToken, InputValidations_1.default.calculationQueryParams, CalculationsController_1.default.calculate);
exports.default = CalculationsRouter;
