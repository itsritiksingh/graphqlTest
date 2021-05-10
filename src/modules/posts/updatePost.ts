import { Resolver,Arg, Mutation,UseMiddleware } from "type-graphql";
import { getRepository } from 'typeorm';
import { Posts } from "../../entity/Post";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";


@Resolver()
export class updatePostResolver {
  @UseMiddleware(isAuth, logger)
  @Mutation(() => Posts)
  async UpdatePosts(
      @Arg("searchTitle") title: string,
      @Arg("newTitle") newTitle: string,
  ): Promise<Posts|undefined> {


    const postsRepository = getRepository(Posts)
    const posts = await postsRepository.findOne({ relations: ["By"], where: { title: title } } );
    if(!posts) {
        throw new Error('posts not found!')
    }
    posts!.title = newTitle;
    await posts?.save();

    return posts
  }
}
