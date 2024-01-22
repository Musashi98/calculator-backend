import { NextFunction, Request, Response } from "express"
import catchErrors from "../utils/CatchErrors"

const numberRegex = /^[+-]?([0-9]*[.])?[0-9]+$/

const usernameRegex = /^[a-zA-Z0-9_-]*$/
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]*$/

const calculationQueryParams = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { num1, num2, op } = req.query

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
        })
    }

    next()
})

const registerBody = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body

    if (!username ||
        !email ||
        !password ||
        !(typeof username === "string") ||
        !(typeof email === "string") ||
        !(typeof password === "string") ||
        !usernameRegex.test(username) ||
        !emailRegex.test(email) ||
        !passwordRegex.test(password)
    ) {
        return res.status(400).json({
            errorCode: 1,
            message: "The data provided is not valid"
        })
    }

    next()
})

const loginBody = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!email ||
        !password ||
        !(typeof email === "string") ||
        !(typeof password === "string") ||
        !emailRegex.test(email) ||
        !passwordRegex.test(password)
    ) {
        return res.status(400).json({
            errorCode: 1,
            message: "The data provided is not valid"
        })
    }

    next()
})

const InputValidations = {
    calculationQueryParams,
    registerBody,
    loginBody
}

export default InputValidations