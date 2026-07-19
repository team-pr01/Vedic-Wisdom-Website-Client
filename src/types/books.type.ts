export type TLevel = {
  name: string; 
};

export type TBooks = {
  _id: string;
  imageUrl: string;
  name: string;
  type: "veda" | "purana" | "upanishad";
  structure: "Chapter-Verse" | "Mandala-Sukta-Rik" | "Kanda-Sarga-Shloka" | "custom";
  levels: TLevel[];
};
