"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = __importDefault(require("../pool"));
const toCamelCase_1 = __importDefault(require("./utils/toCamelCase"));
class UserRepo {
    static async find() {
        const result = await pool_1.default.query("SELECT * FROM users;");
        const { rows } = result || { rows: [] };
        return (0, toCamelCase_1.default)(rows);
    }
    static async findById(id) {
        const result = await pool_1.default.query(`SELECT * FROM users WHERE id = $1;`, [id]);
        const { rows } = result || { rows: [] };
        return (0, toCamelCase_1.default)(rows)[0];
    }
    static async insert(username, bio) {
        const result = await pool_1.default.query("INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *;", [username, bio]);
        const { rows } = result || { rows: [] };
        return (0, toCamelCase_1.default)(rows)[0];
    }
    static async update(id, username, bio) {
        const result = await pool_1.default.query(`
      UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING *;
    `, [username, bio, id]);
        const { rows } = result || { rows: [] };
        return (0, toCamelCase_1.default)(rows)[0];
    }
    static async delete(id) {
        const result = await pool_1.default.query(`
      DELETE FROM users WHERE id = $1;
    `, [id]);
        const { rows } = result || { rows: [] };
        return (0, toCamelCase_1.default)(rows)[0];
    }
}
exports.default = UserRepo;
