import {  IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "email already in use" })
  email: string;

  @Field()
  password: string;
  @Field()
  username: string;
}
