export type CartItem = {
  _id: string;
  name: string;
  slug?: string;
  url: string | undefined;
  color?: string;
  price?: number;
  countInStock: number;
  rating?: number;
  numReviews?: number;
  description?: string;
  category?: string;
  style?: string; // New field
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export type Cart = {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
