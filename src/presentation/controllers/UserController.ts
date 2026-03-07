import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { CreateUserUseCase } from "../../application/usecases/CreateUserUseCase";
import { GetUsersUseCase } from "../../application/usecases/GetUsersUseCase";

const repo = new UserRepository();
const createUser = new CreateUserUseCase(repo);
const getUsers = new GetUsersUseCase(repo);

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const user = await createUser.execute(req.body);
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Failed to create user" });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const users = await getUsers.execute();
      return res.json(users);
    } catch {
      return res.status(500).json({ error: "Failed to fetch users" });
    }
  }
}