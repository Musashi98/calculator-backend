import express from "express"
import CalculationsController from "../controllers/CalculationsController"
import InputValidations from "../middleware/InputValidations"
import AuthVerification from "../middleware/AuthVerification"


const CalculationsRouter = express.Router()

CalculationsRouter.get("/", AuthVerification.checkToken, InputValidations.calculationQueryParams, CalculationsController.calculate)

export default CalculationsRouter