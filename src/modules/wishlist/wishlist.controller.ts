import { Request, Response } from "express";
import * as wishlistService from "./wishlist.service";
import { errorResponse, successResponse } from "../../utils/response";

export const joinWishlist = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const entry = await wishlistService.createWishlistEntry({ email });
    return successResponse(res, entry, "Successfully joined the wishlist", 201);
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};
