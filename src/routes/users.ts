import express, { Router } from "express";
import {
  getAllUsers,
  getUser,
  makeUser,
  changeUser,
  deleteUser,
} from "../controllers/usersController";

const router = Router();

router.route("/users").get(getAllUsers);
router.route("/users/:id").get(getUser);
router.route("/users").post(makeUser);
router.route("/users/:id").put(changeUser);
router.route("/users/:id").delete(deleteUser);

export default router;
