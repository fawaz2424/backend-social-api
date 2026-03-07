import { Request, Response } from "express";
import { PostRepository } from "../../infrastructure/repositories/PostRepository";
import { CreatePostUseCase } from "../../application/usecases/CreatePostUseCase";
import { GetPostsUseCase } from "../../application/usecases/GetPostsUseCase";

const postRepository = new PostRepository();
const createPostUseCase = new CreatePostUseCase(postRepository);
const getPostsUseCase = new GetPostsUseCase(postRepository);

export class PostController {
  static async create(req: Request, res: Response) {
    try {
      const user = (req as any).user;

      const result = await createPostUseCase.execute({
        title: req.body.title,
        content: req.body.content,
        authorId: user.userId,
      });

      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Post creation failed",
      });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const result = await getPostsUseCase.execute();
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Fetching posts failed",
      });
    }
  }
}