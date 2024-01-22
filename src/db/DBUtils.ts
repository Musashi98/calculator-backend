import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { randomUUID } from "crypto"
import DBAdapter from "./DBAdapter"
import User from "../types/User"

dotenv.config()

const tokenKey = process.env.TOKEN_KEY as string
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY as string

const tokenExpiration = process.env.TOKEN_EXPIRATION || "10m"
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION || "20m"

const createUser = async (username: string, email: string, password: string): Promise<User> => {
    let id = randomUUID()

    while ((await DBAdapter.getUserById(id)) !== null) {
        id = randomUUID()
    }

    return {
        id,
        username,
        email,
        password: await encryptPassword(password),
    }
}

const createToken = (username: string, email: string) => {
    const tokenBody = {
        username,
        email
    }

    const token = jwt.sign({ user: JSON.stringify(tokenBody) }, tokenKey, { expiresIn: tokenExpiration })

    return token
}

const createRefreshToken = (username: string, email: string) => {
    const tokenBody = {
        username,
        email
    }

    const token = jwt.sign({ user: JSON.stringify(tokenBody) }, refreshTokenKey, { expiresIn: refreshTokenExpiration })

    return token
}

const decodeToken = (token: string) => {
    return jwt.verify(token, tokenKey)
}

const decodeRefreshToken = (refreshToken: string) => {
    return jwt.verify(refreshToken, refreshTokenKey)
}

const encryptPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 12);

    return hash
}

const isValidPassword = async (password: string, encrypted: string) => {
    return await bcrypt.compare(password, encrypted)
}

const DBUtils = {
    createUser,
    createToken,
    createRefreshToken,
    encryptPassword,
    isValidPassword,
    decodeToken,
    decodeRefreshToken
}

export default DBUtils