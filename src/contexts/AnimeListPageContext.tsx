/* eslint-disable no-unused-vars */
import * as React from "react";

type AnimeListPageContext =
  | { page: number; setPage: (page: number) => void }
  | undefined;

const animeListPageContext =
  React.createContext<AnimeListPageContext>(undefined);
const { Provider } = animeListPageContext;

export const AnimeListPageProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [page, setPage] = React.useState(1);

  return <Provider value={{ page, setPage }}>{children}</Provider>;
};

export const useAnimeListPageContext = () =>
  React.useContext(animeListPageContext);
