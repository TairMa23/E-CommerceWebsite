import { ApiError } from "./types/ApiError";
import { CartItem } from "./types/Cart";
import { Product } from "./types/Product";

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug || "",
    url: product.url || "",
    price: product.price || 0,
    countInStock: product.countInStock || 0,
    color: product.color || "",
    style: product.style || "",
    rating: product.rating || 0,
    numReviews: product.numReviews || 0,
    description: product.description || "",
    category: product.category || "",
  };
  return cartItem;
};
