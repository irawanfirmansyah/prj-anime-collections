export type Collection = {
  id: string;
  name: string;
  animes: Set<number>;
};

export type LocalStorageCollection = {
  id: string;
  name: string;
  animes: number[];
};

export type SubmitAnimeToCollectionEvents =
  | { type: "NEW"; collectionName: string; animeId: number }
  | { type: "ADD_TO_EXISTING"; collections: Collection[] };
