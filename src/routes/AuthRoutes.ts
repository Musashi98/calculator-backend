import express from "express";
import AuthController from "../controllers/AuthController";
import InputValidations from "../middleware/InputValidations";
import AuthVerification from "../middleware/AuthVerification";


const AuthRouter = express.Router();

AuthRouter.post("/login", InputValidations.loginBody, AuthController.login)
AuthRouter.post("/register", InputValidations.registerBody, AuthController.register)
AuthRouter.get("/refresh", AuthVerification.checkRefreshToken, AuthController.refreshToken)

export default AuthRouter