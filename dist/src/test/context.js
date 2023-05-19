"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const crypto_1 = require("crypto");
const node_pg_migrate_1 = __importDefault(require("node-pg-migrate"));
const pg_format_1 = __importDefault(require("pg-format"));
const pool_1 = __importDefault(require("../pool"));
const DEFAULT_OPTS = {
    host: "localhost",
    port: 5432,
    database: "socialnetwork-test",
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
};
class Context {
    static async build() {
        const roleName = "a" + (0, crypto_1.randomBytes)(4).toString("hex");
        await pool_1.default.connect(DEFAULT_OPTS);
        await pool_1.default.query((0, pg_format_1.default)("CREATE ROLE %I WITH LOGIN PASSWORD %L;", roleName, roleName));
        await pool_1.default.query((0, pg_format_1.default)("CREATE SCHEMA %I AUTHORIZATION %I;", roleName, roleName));
        await pool_1.default.close();
        await (0, node_pg_migrate_1.default)({
            schema: roleName,
            direction: "up",
            log: () => { },
            noLock: true,
            dir: "migrations",
            databaseUrl: {
                host: "localhost",
                port: 5432,
                database: "socialnetwork-test",
                user: roleName,
                password: roleName,
            },
            migrationsTable: roleName,
        });
        await pool_1.default.connect({
            host: "localhost",
            port: 5432,
            database: "socialnetwork-test",
            user: roleName,
            password: roleName,
        });
        return new Context(roleName);
    }
    constructor(roleName) {
        this.roleName = roleName;
    }
    async reset() {
        return pool_1.default.query(`
        DELETE FROM users;
    `);
    }
    async close() {
        await pool_1.default.close();
        await pool_1.default.connect(DEFAULT_OPTS);
        await pool_1.default.query((0, pg_format_1.default)("DROP SCHEMA %I CASCADE;", this.roleName));
        await pool_1.default.query((0, pg_format_1.default)("DROP ROLE %I;", this.roleName));
        await pool_1.default.close();
    }
}
exports.default = Context;
