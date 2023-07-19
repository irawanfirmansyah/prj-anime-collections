/* eslint-disable no-unused-vars */
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Collection } from "@/types";
import * as React from "react";

const collectionListPageContext = React.createContext<
  | {
      collections: Collection[];
      removeCollection: (id: number) => void;
      addCollection: () => void;
      collectionNames: Record<string, boolean>;
    }
  | undefined
>(undefined);

const { Provider } = collectionListPageContext;

export const useCollectionListPageContext = () =>
  React.useContext(collectionListPageContext);

const MOCK_COLLECTIONS: Array<Collection> = [
  {
    id: 1,
    name: "collection 1",
    animes: [],
  },
  {
    id: 2,
    name: "collection 2",
    animes: [],
  },
  {
    id: 3,
    name: "collection 3",
    animes: [],
  },
  {
    id: 4,
    name: "collection 4",
    animes: [],
  },
];

export const CollectionListPageProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [getLocalStorage, setLocalStorage] = useLocalStorage<{
    collectionList: Array<Collection>;
  }>("collectionPage");

  const [collectionList, setCollectionList] =
    React.useState<Array<Collection>>(MOCK_COLLECTIONS);

  const collectionNames = collectionList.reduce<Record<string, boolean>>(
    (obj, val) => {
      return {
        ...obj,
        [val.name]: true,
      };
    },
    {},
  );

  const removeCollection = (id: number) => {
    setCollectionList(collectionList.filter((v) => v.id !== id));
  };
  const addCollection = () => {};

  React.useEffect(() => {
    const persistedCollectionPageCtx = getLocalStorage();
    if (persistedCollectionPageCtx) {
      setCollectionList(persistedCollectionPageCtx.collectionList);
    }

    return () => {
      setLocalStorage({ collectionList });
    };
  }, []);

  return (
    <Provider
      value={{
        collections: collectionList,
        removeCollection,
        addCollection,
        collectionNames,
      }}
    >
      {children}
    </Provider>
  );
};
