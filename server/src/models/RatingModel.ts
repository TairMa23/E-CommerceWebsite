import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Rating {
  @prop({ required: true })
  public question1!: number;

  @prop({ required: true })
  public question2!: number;

  @prop({ required: true })
  public question3!: number;

  @prop({ required: true })
  public question4!: number;

  @prop({ required: true })
  public question5!: number;
}

export const RatingModel = getModelForClass(Rating);
