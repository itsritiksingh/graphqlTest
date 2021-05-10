import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Posts } from "./Post";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  username: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @OneToMany(() => Posts, (Posts) => Posts.By)
  @Field(()=> [Posts])
  posts: Posts[];


  @Column()
  password: string;
}
