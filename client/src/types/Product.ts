export type Product = {
  name: string;
  slug: string;
  url: string;
  color?: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  description: string;
  category: string;
  style?: string;
};
