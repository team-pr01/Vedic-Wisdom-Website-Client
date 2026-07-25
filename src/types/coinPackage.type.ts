export type TCoinPackage = {
  _id: string;
  amount: number;
  basePrice: number;
  discountedPrice: number;
  discountPercentage: number;
  pricePerCoin: number;
  createdAt?: Date;
  updatedAt?: Date;
}