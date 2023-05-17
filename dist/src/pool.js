"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
class CustomPool {
    constructor() {
        this._pool = null;
    }
    connect(options) {
        this._pool = new pg_1.default.Pool(options);
        return this._pool.query("SELECT 1+1;");
    }
}
exports.default = new CustomPool();
