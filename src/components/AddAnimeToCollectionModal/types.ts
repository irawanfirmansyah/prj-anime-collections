/* eslint-disable no-unused-vars */
import { Collection, SubmitAnimeToCollectionEvents } from "@/types";

export type AddAnimeToCollectionModalProps = {
  onSubmit: (event: SubmitAnimeToCollectionEvents) => void;
  onClickClose: () => void;
  error?: string;
  initialValues?: { collectionName: string };
  collections: Collection[];
  selectedAnimes?: Map<number, { name: string }>;
};

export type AddAnimeToCollectionType = "ADD_TO_EXISTING" | "NEW";
