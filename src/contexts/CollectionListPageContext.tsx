/* eslint-disable no-unused-vars */
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Collection } from "@/types";
import { generateRandomId } from "@/utils";
import * as React from "react";

const collectionListPageContext = React.createContext<
  | {
      collections: Collection[];
      removeCollection: (id: string) => void;
      addCollection: (collectionName: string) => void;
      collectionNames: Record<string, boolean>;
    }
  | undefined
>(undefined);

const { Provider } = collectionListPageContext;

export const useCollectionListPageContext = () =>
  React.useContext(collectionListPageContext);

export const CollectionListPageProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [getLocalStorage, setLocalStorage] = useLocalStorage<{
    collectionList: Array<Collection>;
  }>("collectionPage");

  const [initiated, setInitiated] = React.useState(false);

  const [collectionList, setCollectionList] = React.useState<Array<Collection>>(
    [],
  );

  const collectionNames = collectionList.reduce<Record<string, boolean>>(
    (obj, val) => {
      return {
        ...obj,
        [val.name]: true,
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
      }}
    >
      {children}
    </Provider>
  );
};
