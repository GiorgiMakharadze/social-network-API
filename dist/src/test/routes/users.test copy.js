"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
require("dotenv/config");
const app_1 = __importDefault(require("../../app"));
const userRepo_1 = __importDefault(require("../../repos/userRepo"));
const pool_1 = __importDefault(require("../../pool"));
beforeAll(() => {
    return pool_1.default.connect({
        host: "localhost",
        port: 5432,
        database: "socialnetwork-test",
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
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
