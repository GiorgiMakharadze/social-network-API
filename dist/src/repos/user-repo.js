"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = __importDefault(require("../pool"));
class UserRepo {
    static async find() {
        const { rows } = await pool_1.default.query("SELECT * FROM users;");
        return rows;
    }
    static async findById() { }
    static async insert() { }
    static async update() { }
    static async delete() { }
}
exports.default = UserRepo;
