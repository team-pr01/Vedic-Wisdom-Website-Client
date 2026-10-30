
export type TPlanStatus = "active" | "draft";

export interface TSubscriptionPlan {
  _id: string;
  name: string;
  description: string;
  currency: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular: boolean;
  status: TPlanStatus;
  createdAt?: string;
  updatedAt?: string;
}