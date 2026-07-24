export type TAudioBook = {
  _id: string;
  thumbnailUrl: string;
  name: string;
  category : string;
  description: string;
  soldCount : number;
  isPremium: boolean;

  createdAt?: Date;
  updatedAt?: Date;
};