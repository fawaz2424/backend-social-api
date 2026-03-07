import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class CreateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(input: User): Promise<User> {
    if (!input.name || !input.email) {
      throw new Error("Name and email are required");
    }

    // Pass the full User object directly
    const createdUser = await this.userRepo.create(input);

    return createdUser;
  }
}