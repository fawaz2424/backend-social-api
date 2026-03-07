import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { RegisterUserUseCase } from "../../application/usecases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../application/usecases/LoginUserUseCase";

const userRepository = new UserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const result = await registerUserUseCase.execute(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Registration failed",
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await loginUserUseCase.execute(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Login failed",
      });
    }
  }
}