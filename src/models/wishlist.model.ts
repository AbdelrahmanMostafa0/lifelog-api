import { Schema, model } from "mongoose";

export interface IWishlist {
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema = new Schema(
  {
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Wishlist = model<IWishlist>("Wishlist", wishlistSchema);
