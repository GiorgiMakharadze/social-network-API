"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = __importDefault(require("../pool"));
const toCamelCase_1 = __importDefault(require("./utils/toCamelCase"));
class UserRepo {
    static async find() {
        const { rows } = await pool_1.default.query("SELECT * FROM users;");
        return (0, toCamelCase_1.default)(rows);
    }
    static async findById(id) {
        const { rows } = await pool_1.default.query(`SELECT * FROM users WHERE id = $1;`, [id]);
        return (0, toCamelCase_1.default)(rows)[0];
    }
    static async insert() { }
    static async update() { }
    static async delete() { }
}
exports.default = UserRepo;
