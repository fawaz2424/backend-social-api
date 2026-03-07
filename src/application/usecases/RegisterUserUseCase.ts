import bcrypt from "bcryptjs";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User, UserRole } from "../../domain/entities/User";

interface RegisterUserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date | undefined;
}

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: User): Promise<RegisterUserResponse> {
    if (!input.name || !input.email || !input.password) {
      throw new Error("Name, email and password are required");
    }

    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const createdUser = await this.userRepository.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role ?? "user",
    });

    if (!createdUser.id) {
      throw new Error("User id was not generated");
    }

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      createdAt: createdUser.createdAt,
    };
  }
}