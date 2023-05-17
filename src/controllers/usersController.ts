import { Request, Response } from "express";
import UserRepo from "../repos/user-repo";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserRepo.find();

  res.send(users);
};

export const getUser = async (req: Request, res: Response) => {};
export const makeUser = async (req: Request, res: Response) => {};
export const changeUser = async (req: Request, res: Response) => {};
export const deleteUser = async (req: Request, res: Response) => {};
