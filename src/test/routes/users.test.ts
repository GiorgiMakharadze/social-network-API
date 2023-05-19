import request from "supertest";
import "dotenv/config";
import { randomBytes } from "crypto";
import { default as migrate } from "node-pg-migrate";
import format from "pg-format";
import createApp from "../../app";
import UserRepo from "../../repos/userRepo";
import pool from "../../pool";

beforeAll(async () => {
  const roleName = "a" + randomBytes(4).toString("hex");

  await pool.connect({
    host: "localhost",
    port: 5432,
    database: "socialnetwork-test",
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  });

  await pool.query(
    format("CREATE ROLE %I WITH LOGIN PASSWORD %L;", roleName, roleName)
  );

  await pool.query(
    format("CREATE SCHEMA %I AUTHORIZATION %I;", roleName, roleName)
  );

  await pool.close();

  await migrate({
    schema: roleName,
    direction: "up",
    log: () => {},
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

  await pool.connect({
    host: "localhost",
    port: 5432,
    database: "socialnetwork-test",
    user: roleName,
    password: roleName,
  });
});

afterAll(() => {
  return pool.close();
});

it("create a user", async () => {
  const startingCount = await UserRepo.count();

  await request(createApp())
    .post("/users")
    .send({ username: "testuser", bio: "test bio" })
    .expect(201);

  const finishCount = await UserRepo.count();
  expect(finishCount - startingCount).toEqual(1);
});
