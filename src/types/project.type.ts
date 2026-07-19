
export type TDonor = {
  name: string;
  phoneNumber: string;
  amount: string;
  donatedAt: string;
};

export type TProject = {
  _id: string;
  imageUrl?: string;
  title: string;
  description: string;
  location: string;
  startDate?: string;
  currency: string;
  amountNeeded: number;
  amountRaised?: number;
  donors: TDonor[];
  createdAt?: string;
  updatedAt?: string;
};