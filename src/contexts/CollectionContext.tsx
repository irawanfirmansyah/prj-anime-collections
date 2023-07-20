/* eslint-disable no-unused-vars */
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Collection } from "@/types";
import { generateRandomId } from "@/utils";
import * as React from "react";

const collectionContext = React.createContext<
  | {
      collections: Collection[];
      removeCollection: (id: string) => void;
      addCollection: (collectionName: string) => void;
      collectionNames: Record<string, { id: string }>;
      getCollection: (id: string) => Collection | undefined;
      updateCollection: (id: string, collectionName: string) => void;
    }
  | undefined
>(undefined);

const { Provider } = collectionContext;

export const useCollectionContext = () => React.useContext(collectionContext);

export const CollectionProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [getLocalStorage, setLocalStorage] = useLocalStorage<{
    collectionList: Array<Collection>;
  }>("collection");

  const [initiated, setInitiated] = React.useState(false);

  const [collectionList, setCollectionList] = React.useState<Array<Collection>>(
    [],
  );

  const collectionNames = collectionList.reduce<Record<string, { id: string }>>(
    (obj, val) => {
      return {
        ...obj,
        [val.name]: {
          id: val.id,
        },
      };
    },
    {},
  );

  const removeCollection = (id: string) => {
    setCollectionList(collectionList.filter((v) => v.id !== id));
  };
  const addCollection = (collectionName: string) => {
    const id = generateRandomId();
    setCollectionList([
      ...collectionList,
      { id, animes: [], name: collectionName },
    ]);
  };

  const getCollection = (id: string) => collectionList.find((c) => c.id === id);

  const updateCollection = (id: string, collectionName: string) =>
    setCollectionList(
      collectionList.map((v) =>
        v.id === id ? { ...v, name: collectionName } : v,
      ),
    );

  React.useEffect(() => {
    if (!initiated) {
      setCollectionList(getLocalStorage()?.collectionList || []);
      setInitiated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initiated]);

  React.useEffect(() => {
    window.onbeforeunload = () => {
      setLocalStorage({ collectionList });
      console.log("test");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionList]);

  if (!initiated) {
    return null;
  }

  return (
    <Provider
      value={{
        collections: collectionList,
        removeCollection,
        addCollection,
        collectionNames,
        getCollection,
        updateCollection,
      }}
    >
      {children}
    </Provider>
  );
};
