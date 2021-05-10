import { Resolver, Mutation,Arg,UseMiddleware } from "type-graphql";
import { getRepository } from 'typeorm';
import { Posts } from "../../entity/Post";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";

@Resolver()
export class deletePostResolver {
  @UseMiddleware(isAuth, logger)
  @Mutation(() => Posts)
  async DeletePost(
      @Arg("searchTitle") title: string,
  ): Promise<Posts|undefined> {


    const postsRepository = getRepository(Posts)
    const posts = await postsRepository.findOne({ relations: ["By"], where: { title: title } } );
    if(!posts) {
        throw new Error('posts not found!')
    }
    await postsRepository.delete({title})

    return posts
  }
}
