import { Wishlist } from "../../models/wishlist.model";
import { CreateWishlistDTO } from "./wishlist.types";

export const createWishlistEntry = async (data: CreateWishlistDTO) => {
  const entry = await Wishlist.create(data);
  return entry;
};
