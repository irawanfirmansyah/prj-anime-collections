/* eslint-disable no-unused-vars */
import { COLORS } from "@/constants/colors";
import { CloseIcon, Container } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useCollectionListPageContext } from "@/contexts";
import * as React from "react";

const CollectionList = () => {
  const collectionListPageCtx = useCollectionListPageContext();

  const [
    showConfirmRemoveCollectionModal,
    setShowConfirmRemoveCollectionModal,
  ] = React.useState(false);
  const [showAddCollectionModal, setShowAddCollectionModal] =
    React.useState(false);

  const [errorSubmitCollectionMsg, setErrorSubmitCollectionMsg] =
    React.useState("");
  const collectionId = React.useRef<string | null>(null);

  if (!collectionListPageCtx) return null;

  const onSubmitRemoveCollection = () => {
    if (!collectionId.current) return;
    collectionListPageCtx.removeCollection(collectionId.current);
  };

  const { collections } = collectionListPageCtx;

  const handleClickRemoveCollection =
    (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      collectionId.current = id;
      setShowConfirmRemoveCollectionModal(true);
    };

  const handleSubmitAddCollectionForm = ({
    collectionName,
  }: {
    collectionName: string;
  }) => {
    if (collectionListPageCtx.collectionNames[collectionName]) {
      console.log(collectionListPageCtx.collectionNames);
      setErrorSubmitCollectionMsg("Collection name already exists");
      return;
    }
    collectionListPageCtx.addCollection(collectionName);
    setErrorSubmitCollectionMsg("");
    setShowAddCollectionModal(false);
  };

  const handleClickAddCollection = () => {
    setShowAddCollectionModal(true);
  };

  const renderCollectionList = () => {
    if (collectionListPageCtx.collections.length <= 0) {
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
                  backgroundColor: COLORS.grey,
                },
              }}
            >
              <h4 css={{ fontSize: "1.25rem", textAlign: "center" }}>
                {c.name}
              </h4>
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
              <button
                onClick={handleClickRemoveCollection(c.id)}
                css={{
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
                Remove Collection
              </button>
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
        <h3 css={{ fontSize: "1.5rem" }}>Collection List</h3>
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
        <AddCollectionModalContent
          error={errorSubmitCollectionMsg}
          onClickClose={() => {
            setShowAddCollectionModal(false);
            setErrorSubmitCollectionMsg("");
          }}
          onSubmit={handleSubmitAddCollectionForm}
        />
      ) : null}
    </Container>
  );
};

const Backdrop = () => (
  <div
    css={{
      position: "fixed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: COLORS.black,
      opacity: 0.2,
      zIndex: 99,
    }}
  />
);

const RemoveCollectionConfirmationModal = ({
  onClickConfirm,
  onClickCancel,
}: {
  onClickConfirm: () => void;
  onClickCancel: () => void;
}) => {
  return (
    <>
      <Backdrop />
      <div
        css={{
          borderRadius: ".875rem",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          backgroundColor: COLORS.white,
          display: "flex",
          flexDirection: "column",
          top: "50%",
          left: "50%",
          position: "fixed",
          zIndex: 100,
          transform: "translate(-50%, -50%)",
          padding: "1rem 2rem",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <p
          css={{
            fontWeight: 600,
            fontSize: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          Are you sure you want to delete this collection
        </p>
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: ".5rem",
          }}
        >
          <button
            css={{
              padding: ".5rem .875rem",
              backgroundColor: COLORS.white,
              border: `1px solid ${COLORS.black}`,
              borderRadius: ".5rem",
              flex: 1,
              ":hover": {
                backgroundColor: COLORS.grey,
              },
              fontWeight: 600,
            }}
            onClick={onClickCancel}
          >
            Cancel
          </button>
          <button
            css={{
              padding: ".5rem .875rem",
              backgroundColor: COLORS.blue,
              ":hover": {
                backgroundColor: COLORS.darkBlue,
              },
              color: COLORS.white,
              border: `1px solid ${COLORS.darkBlue}`,
              borderRadius: ".5rem",
              flex: 1,
              fontWeight: 600,
            }}
            onClick={onClickConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

type AddCollectionModalContentProps = {
  onSubmit: ({ collectionName }: { collectionName: string }) => void;
  onClickClose: () => void;
  error?: string;
};

const AddCollectionModalContent = ({
  onSubmit,
  onClickClose,
  error,
}: AddCollectionModalContentProps) => {
  console.log({ error });
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const collectionName = formData.get("collectionName")
      ? String(formData.get("collectionName"))
      : "";
    onSubmit({ collectionName });
  };

  return (
    <>
      <Backdrop />
      <div
        css={{
          borderRadius: ".875rem",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          backgroundColor: COLORS.white,
          display: "flex",
          flexDirection: "column",
          top: "50%",
          left: "50%",
          position: "fixed",
          zIndex: 100,
          transform: "translate(-50%, -50%)",
          padding: "1rem 2rem",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <form
          onSubmit={handleFormSubmit}
          css={{
            "& > *:not(:last-child)": {
              marginBottom: "1rem",
            },
          }}
        >
          <div
            css={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "2rem",
              marginBottom: "1rem",
            }}
          >
            <p
              css={{
                fontWeight: 600,
                fontSize: "1.5rem",
              }}
            >
              Add a Collection
            </p>
            <CloseIcon
              onClick={() => {
                onClickClose();
              }}
              css={{
                marginLeft: "auto",
                cursor: "pointer",
              }}
            />
          </div>
          <div
            css={{
              marginBottom: "2rem",
              textAlign: "left",
            }}
          >
            <label
              htmlFor="collectionName"
              css={{
                display: "block",
                marginBottom: ".25rem",
                fontWeight: 600,
              }}
            >
              Collection Name
            </label>
            <input
              id="collectionName"
              name="collectionName"
              css={{
                display: "block",
                borderRadius: ".25rem",
                padding: ".25rem .5rem",
                width: "100%",
                borderWidth: "1px",
                borderStyle: "solid",
                fontSize: "1rem",
                ...(error && {
                  outlineColor: COLORS.red,
                  borderColor: COLORS.red,
                }),
              }}
              type="text"
              pattern="[a-zA-Z0-9\s]+"
              title="No special characters allowed"
            />
            {error ? (
              <span css={{ color: COLORS.red, fontSize: ".75rem" }}>
                {error}
              </span>
            ) : null}
          </div>
          <button
            css={{
              padding: ".5rem .875rem",
              backgroundColor: COLORS.blue,
              ":hover": {
                backgroundColor: COLORS.darkBlue,
              },
              color: COLORS.white,
              border: `1px solid ${COLORS.darkBlue}`,
              borderRadius: ".5rem",
              flex: 1,
              fontWeight: 600,
              width: "100%",
            }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CollectionList;
