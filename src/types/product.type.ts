/* eslint-disable @typescript-eslint/no-explicit-any */

export type TProduct = {
  _id: string;
  name: string;
  category: string;
  description: string;
  imageUrls: string[];
  rating?: number;
  soldCount?: number;
  priceCurrency: string;
  basePrice: number;
  discountedPrice?: number;
  totalClicks?: number;
  addedBy: any;
  createdAt?: Date;
  updatedAt?: Date;
};