import {
  modelOptions,
  prop,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";
import { UserPreference } from "./UserPreference";

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  public _id?: string;
  @prop({ required: true })
  public name!: string;
  @prop({ required: true, unique: true })
  public email!: string;
  @prop({ required: true })
  public password!: string;
  @prop({ required: true, default: false })
  public isAdmin!: boolean;
  @prop({ ref: () => UserPreference })
  public preferences?: Ref<UserPreference>;
}

export const UserModel = getModelForClass(User);
