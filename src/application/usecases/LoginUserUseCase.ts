import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user.id!,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}