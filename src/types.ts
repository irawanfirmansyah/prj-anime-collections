import { Media } from "./__generated__/graphql";

export type Collection = {
  id: number;
  name: string;
  animes: Array<Media>;
};
