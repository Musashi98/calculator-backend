import { Config, JsonDB } from "node-json-db";
import User from "../types/User";


const db = new JsonDB(new Config("Users", true, false, "/"))

const getUserByEmail = async (email: string) => {
    try {
        const users: object = await db.getData("/")

        for (const user of Object.values(users)) {
            if (user.email == email) {
                return user
            }
        }

        return null
    }
    catch {
        return null
    }
}

const getUserById = async (id: string) => {
    try {
        const user: User = await db.getData(`/${id}`)

        if (user) {
            return user
        }

        return null
    }
    catch {
        return null
    }
}

const addUser = async (user: User) => {
    await db.push(`/${user.id}`, user)
}

const DBAdapter = {
    getUserByEmail,
    getUserById,
    addUser,
}

export default DBAdapter