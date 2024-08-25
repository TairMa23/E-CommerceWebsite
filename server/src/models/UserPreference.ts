import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class UserPreference {
  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true, type: () => Object })
  public emotionPercentages!: Record<string, number>;

  @prop({ required: true, type: () => Object })
  public stylePercentages!: Record<string, number>;
}

export const UserPreferenceModel = getModelForClass(UserPreference);
