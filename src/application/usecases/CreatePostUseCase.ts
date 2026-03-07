import { Post } from "../../domain/entities/Post";
import { IPostRepository } from "../../domain/repositories/IPostRepository";

interface CreatePostInput {
  title: string;
  content: string;
  authorId: string;
}

interface CreatePostResponse {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export class CreatePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(input: CreatePostInput): Promise<CreatePostResponse> {
    if (!input.title || !input.content || !input.authorId) {
      throw new Error("Title, content and authorId are required");
    }

    const createdPost = await this.postRepository.create({
      title: input.title,
      content: input.content,
      authorId: input.authorId,
    });

    if (!createdPost.id) {
      throw new Error("Post id was not generated");
    }

    return {
      id: createdPost.id,
      title: createdPost.title,
      content: createdPost.content,
      authorId: createdPost.authorId,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    };
  }
}