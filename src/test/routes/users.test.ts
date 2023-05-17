import request from "supertest";
import "dotenv/config";
import createApp from "../../app";
import UserRepo from "../../repos/userRepo";
import pool from "../../pool";

beforeAll(() => {
  return pool.connect({
    host: "localhost",
    port: 5432,
    database: "socialnetwork-test",
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
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
