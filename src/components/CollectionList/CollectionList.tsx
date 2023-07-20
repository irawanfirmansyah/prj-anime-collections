import { COLORS } from "@/constants/colors";
import {
  AddCollectionModal,
  Container,
  RemoveCollectionConfirmationModal,
} from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useCollectionContext } from "@/contexts";
import * as React from "react";
import { Collection } from "@/types";

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
        {collections.map((c, i) => (
          <Link
            css={{
              display: "block",
            }}
            key={c.id}
            href={{
              pathname: "/collection/details",
              query: {
                id: c.id,
              },
            }}
          >
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
                border: `1px solid ${COLORS.black}`,
                borderRadius: "1rem",
                padding: "1rem",
                alignItems: "center",
                height: "100%",
                ":hover": {
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                },
              }}
            >
              <p css={{ fontSize: "1.25rem", textAlign: "center" }}>{c.name}</p>
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "1rem",
                  position: "relative",
                }}
              >
                <Image
                  css={{
                    alignSelf: "start",
                  }}
                  src={
                    // c.animes.length > 0 && c.animes[0].coverImage?.extraLarge
                    //   ? c.animes[0].coverImage?.extraLarge
                    //   :
                    "https://via.placeholder.com/56x56"
                  }
                  alt={`anime-logo-${i}`}
                  width={200}
                  height={200}
                />
              </div>
              <div
                css={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: ".5rem",
                }}
              >
                <button
                  onClick={handleClickRemoveCollection(c.id)}
                  css={{
                    minWidth: "5rem",
                    border: "none",
                    backgroundColor: COLORS.red,
                    padding: ".5rem .875rem",
                    color: COLORS.white,
                    cursor: "pointer",
                    borderRadius: ".75rem",
                    fontWeight: 600,
                    ":hover": {
                      backgroundColor: COLORS.darkRed,
                    },
                  }}
                >
                  Remove
                </button>
                <button
                  onClick={handleClickEditCollection(c)}
                  css={{
                    minWidth: "5rem",
                    border: "none",
                    backgroundColor: COLORS.blue,
                    padding: ".5rem .875rem",
                    cursor: "pointer",
                    borderRadius: ".75rem",
                    color: COLORS.white,
                    fontWeight: 600,
                    ":hover": {
                      backgroundColor: COLORS.darkBlue,
                    },
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </Link>
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
