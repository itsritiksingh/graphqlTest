import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";

import { MyContext } from "../../types/MyContext";
import { Posts } from "../../entity/Post";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";
import { User } from "../../entity/User";

@Resolver()
export class CreatePostResolver {
  @UseMiddleware(isAuth, logger)
  @Mutation(() => Posts)
  async createPost(
    @Arg("title") title: string,
    @Ctx() ctx: MyContext
  ): Promise<Posts> {
    const user = await User.findOne(ctx.req.session?.userId);

    // const post = await Posts.create({
    //   title,
    //   By: user,
    // }).save();

    const post = new Posts();
    post.title = title,
    post.By = user;
    await post.save();

    // // user?.posts ? user?.posts.push(post): user?['post'] = [post];
    // user?.posts?.push(post);
    // console.log(user?.posts)

    // await user?.save()
    return post;

    // return user;
  }
}
