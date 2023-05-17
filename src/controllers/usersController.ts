import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserRepo from "../repos/userRepo";
import { NotFoundError } from "../../errors";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserRepo.find();

  res.status(StatusCodes.OK).json({ msg: "All users", users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserRepo.findById(id as unknown as number);

  if (!user) {
    throw new NotFoundError(`No user with id: ${id}`);
  }

  res.status(StatusCodes.OK).json(user);
};
export const insertUser = async (req: Request, res: Response) => {
  const { username, bio } = req.body;

  const user = await UserRepo.insert(username, bio);

  res.status(StatusCodes.CREATED).json({ msg: "New user created!", user });
};
export const changeUser = async (req: Request, res: Response) => {};
export const deleteUser = async (req: Request, res: Response) => {};
