import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express"
import catchErrors from "../utils/CatchErrors"
import jwt, { TokenExpiredError } from "jsonwebtoken"

dotenv.config()

const tokenKey = process.env.TOKEN_KEY as string
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY as string

const checkToken = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const authorizationInfo = req.headers.authorization;

    if (!authorizationInfo || !(typeof authorizationInfo === "string")) {
        return res.status(401).json({
            message: "The authentication token is missing"
        })
    }

    const bearerText = authorizationInfo.split(" ")[0]
    const token = authorizationInfo.split(" ")[1]

    if (!bearerText || bearerText !== "Bearer") {
        return res.status(401).json({
            message: "The protocol is invalid"
        })
    }

    if (!token) {
        return res.status(401).json({
            message: "The authentication token is missing"
        })
    }

    jwt.verify(token, tokenKey, (err, decodedToken: any) => {
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
})

const checkRefreshToken = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const authorizationInfo = req.headers.authorization;

    if (!authorizationInfo || !(typeof authorizationInfo === "string")) {
        return res.status(401).json({
            message: "The authentication refresh token is missing"
        })
    }

    const bearerText = authorizationInfo.split(" ")[0]
    const refreshToken = authorizationInfo.split(" ")[1]

    if (!bearerText || bearerText !== "Bearer") {
        return res.status(401).json({
            message: "The protocol is invalid"
        })
    }

    if (!refreshToken) {
        return res.status(401).json({
            message: "The authentication refresh token is missing"
        })
    }

    jwt.verify(refreshToken, refreshTokenKey, (err, decodedToken: any) => {
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
})

const AuthVerification = {
    checkToken,
    checkRefreshToken
}

export default AuthVerification