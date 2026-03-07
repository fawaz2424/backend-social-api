import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { UserModel } from "../database/models/UserModel";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const created = await UserModel.create(user);

    return {
      id: created._id.toString(),
      name: created.name,
      email: created.email,
      password: created.password,
      role: created.role,
      createdAt: created.createdAt,
    };
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find().sort({ createdAt: -1 });

    return users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      password: u.password,
      role: u.role,
      createdAt: u.createdAt,
    }));
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}