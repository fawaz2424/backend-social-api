import { User } from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}