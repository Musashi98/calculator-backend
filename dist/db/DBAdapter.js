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
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = require("node-json-db");
const db = new node_json_db_1.JsonDB(new node_json_db_1.Config("Users", true, false, "/"));
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db.getData("/");
        for (const user of Object.values(users)) {
            if (user.email == email) {
                return user;
            }
        }
        return null;
    }
    catch (_a) {
        return null;
    }
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.getData(`/${id}`);
        if (user) {
            return user;
        }
        return null;
    }
    catch (_b) {
        return null;
    }
});
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.push(`/${user.id}`, user);
});
const DBAdapter = {
    getUserByEmail,
    getUserById,
    addUser,
};
exports.default = DBAdapter;
