
export type TNewsTranslation = {
  title: string;
  overview: string;
  content: string;
  tags: string[];
};

export type TNews = {
  _id: string;
  imageUrl: string;
  title : string;
  overview: string;
  category: string;
  likes?: number;
  likedBy?: string[];
  views?: number;
  viewedBy?: string[];
  isTrending: boolean;
  createdAt: string;
  updatedAt?: string;
};