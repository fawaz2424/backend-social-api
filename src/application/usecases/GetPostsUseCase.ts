import { Post } from "../../domain/entities/Post";
import { IPostRepository } from "../../domain/repositories/IPostRepository";

export class GetPostsUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(): Promise<Post[]> {
    return await this.postRepository.findAll();
  }
}