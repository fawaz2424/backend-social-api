import { Post } from "../../domain/entities/Post";
import { IPostRepository } from "../../domain/repositories/IPostRepository";
import { PostModel } from "../database/models/PostModel";

export class PostRepository implements IPostRepository {
  async create(post: Post): Promise<Post> {
    const created = await PostModel.create(post);

    return {
      id: created._id.toString(),
      title: created.title,
      content: created.content,
      authorId: created.authorId,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }

  async findAll(): Promise<Post[]> {
    const posts = await PostModel.find().sort({ createdAt: -1 });

    return posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  }
}