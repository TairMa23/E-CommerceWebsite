import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Product {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public slug!: string;

  @prop({ required: true })
  public url!: string;

  @prop({ required: true })
  public color!: string;

  @prop({ required: true, default: 0 })
  public price!: number;

  @prop({ required: true, default: 0 })
  public countInStock!: number;

  @prop({ required: true, default: 0 })
  public rating!: number;

  @prop({ required: true, default: 0 })
  public numReviews!: number;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public category!: string;

  @prop({ required: true })
  public style!: string;
}

export const ProductModel = getModelForClass(Product);
