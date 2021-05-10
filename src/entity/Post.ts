import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import {User} from "./User"

@ObjectType()
@Entity()
export class Posts extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { unique: true })
  title: string;

  @ManyToOne(() => User,us => us.posts)
  @Field(() => User)
  By?: User;

}