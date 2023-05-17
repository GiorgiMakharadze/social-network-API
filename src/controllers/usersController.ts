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

  const user = await UserRepo.findById(id);

  if (!user) {
    throw new NotFoundError(`No user with id: ${id}`);
  }

  res.status(StatusCodes.OK).json(user);
};

export const makeUser = async (req: Request, res: Response) => {};
export const changeUser = async (req: Request, res: Response) => {};
export const deleteUser = async (req: Request, res: Response) => {};
