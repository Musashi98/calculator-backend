import { Request, Response } from "express";
import catchErrors from "../utils/CatchErrors";
import DBUtils from "../db/DBUtils";
import DBAdapter from "../db/DBAdapter";


const login = catchErrors(async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await DBAdapter.getUserByEmail(email)

    if (user === null) {
        return res.status(400).json({
            errorCode: 2,
            message: "No user with that email and password exist"
        })
    }

    if (!(await DBUtils.isValidPassword(password, user.password))) {
        return res.status(400).json({
            errorCode: 2,
            message: "No user with that email and password exist"
        })
    }

    const newToken = DBUtils.createToken(user.username, user.email)
    const newRefreshToken = DBUtils.createRefreshToken(user.username, user.email)

    user.token = newToken
    user.refreshToken = newRefreshToken

    return res.status(200).json({ ...user, password: undefined })
})

const register = catchErrors(async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    const user = await DBAdapter.getUserByEmail(email)

    if (user !== null) {
        return res.status(400).json({
            errorCode: 2,
            message: "The email is taken"
        })
    }

    const newUser = await DBUtils.createUser(username, email, password)

    await DBAdapter.addUser(newUser)

    const newToken = DBUtils.createToken(newUser.username, newUser.email)
    const newRefreshToken = DBUtils.createRefreshToken(newUser.username, newUser.email)

    newUser.token = newToken
    newUser.refreshToken = newRefreshToken

    return res.status(200).json({ ...newUser, password: undefined })
})

const refreshToken = catchErrors(async (req: Request, res: Response) => {
    const { decodedToken } = req.body

    const userData = JSON.parse(decodedToken.user)

    const token = DBUtils.createToken(userData.username, userData.email)
    const refreshToken = DBUtils.createRefreshToken(userData.username, userData.email)

    return res.status(200).json({
        token,
        refreshToken
    })
})


const AuthController = {
    login,
    register,
    refreshToken
}

export default AuthController