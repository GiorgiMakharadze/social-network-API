import request from "supertest";
import "dotenv/config";
import createApp from "../../app";
import UserRepo from "../../repos/userRepo";
import Context from "../context";

let context: Context;

beforeAll(async () => {
  context = await Context.build();
});

beforeEach(async () => {
  await context.reset();
});

afterAll(() => {
  return context.close();
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
