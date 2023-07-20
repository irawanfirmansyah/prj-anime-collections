import React from "react";

export type AnimeDetailsInfoProps = React.HTMLProps<HTMLDivElement> & {
  title: string;
  description: string;
  coverImageUrl?: string;
  episodes: number;
  genres: (string | null)[];
  ctaContent?: React.ReactNode;
  collectedIn: Array<{ id: string; collectionName: string }>;
};
