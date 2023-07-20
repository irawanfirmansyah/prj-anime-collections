import { COLORS } from "@/constants/colors";
import {
  AddCollectionModal,
  Container,
  RemoveCollectionConfirmationModal,
} from "@/components";
import { useCollectionContext } from "@/contexts";
import * as React from "react";
import { Collection } from "@/types";
import CollectionCard from "../CollectionCard/CollectionCard";

const CollectionList = () => {
  const collectionCtx = useCollectionContext();

  const [
    showConfirmRemoveCollectionModal,
    setShowConfirmRemoveCollectionModal,
  ] = React.useState(false);
  const [showAddCollectionModal, setShowAddCollectionModal] =
    React.useState(false);

  const [errorSubmitCollectionMsg, setErrorSubmitCollectionMsg] =
    React.useState("");
  const collectionId = React.useRef<string | null>(null);

  if (!collectionCtx) return null;

  const onSubmitRemoveCollection = () => {
    if (!collectionId.current) return;
    removeCollection(collectionId.current);
  };

  const {
    collections,
    getCollection,
    addCollection,
    removeCollection,
    updateCollectionName,
    collectionNames,
  } = collectionCtx;

  const handleClickRemoveCollection =
    (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      collectionId.current = id;
      setShowConfirmRemoveCollectionModal(true);
    };

  const handleClickEditCollection =
    (collection: Collection) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      collectionId.current = collection.id;
      setShowAddCollectionModal(true);
    };

  const collectionNameIsValid = (collectionName: string) => {
    if (collectionId.current) {
      const currCollection = getCollection(collectionId.current);
      if (currCollection?.name === collectionName) {
        return true;
      }
      if (!collectionNames[collectionName]) {
        return true;
      }
      return false;
    }
    return !collectionNames[collectionName];
  };

  const handleSubmitAddCollectionForm = ({
    collectionName,
  }: {
    collectionName: string;
  }) => {
    if (!collectionName) {
      setErrorSubmitCollectionMsg("This field is required");
      return;
    }
    if (!collectionNameIsValid(collectionName)) {
      setErrorSubmitCollectionMsg("Collection name already exists");
      return;
    }
    if (collectionId.current) {
      updateCollectionName(collectionId.current, collectionName);
    }
    if (!collectionId.current) {
      addCollection(collectionName);
    }

    collectionId.current = null;
    setErrorSubmitCollectionMsg("");
    setShowAddCollectionModal(false);
  };

  const handleClickAddCollection = () => {
    setShowAddCollectionModal(true);
  };

  const getCurrCollection = () => {
    if (!collectionId.current) return undefined;
    return getCollection(collectionId.current);
  };

  const renderCollectionList = () => {
    if (collections.length <= 0) {
      return <div css={{ height: "100%" }}>No Collections. Try add one.</div>;
    }
    return (
      <div
        css={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(3, minmax(300px, 1fr))",
          "@media (max-width:960px)": {
            gridTemplateColumns: "repeat(2, minmax(200px, 1fr))",
          },
          "@media (max-width:600px)": {
            gridTemplateColumns: "auto",
          },
          "& > a:not(:last-child)": {
            marginBottom: ".5rem",
          },
        }}
      >
        {collections.map((c) => (
          <CollectionCard
            key={c.id}
            collection={c}
            onClickRemove={handleClickRemoveCollection(c.id)}
            onClickEditCollection={handleClickEditCollection(c)}
          />
        ))}
      </div>
    );
  };

  return (
    <Container>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <p css={{ fontSize: "1.5rem" }}>Collection List</p>
        <button
          onClick={handleClickAddCollection}
          css={{
            backgroundColor: COLORS.black,
            color: COLORS.white,
            padding: ".5rem .875rem",
            borderRadius: ".875rem",
            fontSize: "1rem",
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add a Collection
        </button>
      </div>
      {renderCollectionList()}
      {showConfirmRemoveCollectionModal ? (
        <RemoveCollectionConfirmationModal
          onClickCancel={() => {
            setShowConfirmRemoveCollectionModal(false);
          }}
          onClickConfirm={() => {
            onSubmitRemoveCollection();
            setShowConfirmRemoveCollectionModal(false);
          }}
        />
      ) : null}
      {showAddCollectionModal ? (
        <AddCollectionModal
          error={errorSubmitCollectionMsg}
          onClickClose={() => {
            setShowAddCollectionModal(false);
            setErrorSubmitCollectionMsg("");
            collectionId.current = null;
          }}
          onSubmit={handleSubmitAddCollectionForm}
          {...(getCurrCollection() && {
            initialValues: { collectionName: getCurrCollection()?.name || "" },
          })}
        />
      ) : null}
    </Container>
  );
};

export default CollectionList;
