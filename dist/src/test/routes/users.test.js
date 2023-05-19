"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
require("dotenv/config");
const crypto_1 = require("crypto");
const node_pg_migrate_1 = __importDefault(require("node-pg-migrate"));
const pg_format_1 = __importDefault(require("pg-format"));
const app_1 = __importDefault(require("../../app"));
const userRepo_1 = __importDefault(require("../../repos/userRepo"));
const pool_1 = __importDefault(require("../../pool"));
beforeAll(async () => {
    const roleName = "a" + (0, crypto_1.randomBytes)(4).toString("hex");
    await pool_1.default.connect({
        host: "localhost",
        port: 5432,
        database: "socialnetwork-test",
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
    });
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
        migrationsTable: "",
    });
    await pool_1.default.connect({
        host: "localhost",
        port: 5432,
        database: "socialnetwork-test",
        user: roleName,
        password: roleName,
    });
});
afterAll(() => {
    return pool_1.default.close();
});
it("create a user", async () => {
    const startingCount = await userRepo_1.default.count();
    await (0, supertest_1.default)((0, app_1.default)())
        .post("/users")
        .send({ username: "testuser", bio: "test bio" })
        .expect(201);
    const finishCount = await userRepo_1.default.count();
    expect(finishCount - startingCount).toEqual(1);
});
