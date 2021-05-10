import { Resolver, Query,Arg } from "type-graphql";
import { getRepository,Like } from 'typeorm';
import { Posts } from "../../entity/Post";
// import { MyContext } from "../../types/MyContext";

@Resolver()
export class getPostResolver {
  @Query(() => [Posts], { nullable: true })
  async AllPosts(
      @Arg("title",{nullable:true}) title: string,
      @Arg("skip",{nullable:true}) skip: number,
      @Arg("take",{nullable:true}) take: number

  ): Promise<Posts[]> {
   if(title){
    const postsRepository = getRepository(Posts)
    const posts = await postsRepository.find({ relations: ["By"], where: { title: Like(`${title}%`) }, skip, take } );
    return posts
   }else {
       return Posts.find({relations: ["By"], skip, take });
   }
  }
}
