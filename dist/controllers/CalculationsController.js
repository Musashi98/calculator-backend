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
const calculate = (0, CatchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { num1, num2, op } = req.query;
    const float1 = Number.parseFloat(num1), float2 = Number.parseFloat(num2);
    let result = float1;
    switch (op) {
        case "add": {
            result += float2;
            break;
        }
        case "sub": {
            result -= float2;
            break;
        }
        case "mult": {
            result *= float2;
            break;
        }
        default: {
            result /= float2;
            break;
        }
    }
    return res.status(200).json({
        result
    });
}));
const CalculationsController = {
    calculate
};
exports.default = CalculationsController;
