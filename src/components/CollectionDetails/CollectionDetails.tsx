import React from "react";
import { AddCollectionModal, Container } from "@/components";
import { useLazyQuery } from "@apollo/client";
import { GET_ANIME_LIST_BY_IDS } from "@/lib/api";
import { useCollectionContext } from "@/contexts";
import { useRouter } from "next/router";
import { COLORS } from "@/constants/colors";
import Image from "next/image";
import Link from "next/link";
import RemoveAnimeFromCollectionModal from "../RemoveAnimeFromCollectionModal/RemoveAnimeFromCollectionModal";

const CollectionDetails = () => {
  const router = useRouter();
  const collectionId = router.query.id ? String(router.query.id) : "";
  const collectionCtx = useCollectionContext();

  const [getAnimeList, { data, loading }] = useLazyQuery(GET_ANIME_LIST_BY_IDS);
  const collection = collectionCtx?.getCollection(collectionId);

  const collectionAnimes = data?.Page?.media || [];

  const [showEditCollectionModal, setShowEditCollectionModal] =
    React.useState(false);
  const [
    showRemoveAnimeFromCollectionModal,
    setShowRemoveAnimeFromCollectionModal,
  ] = React.useState(false);
  const [errorSubmitCollectionMsg, setErrorSubmitCollectionMsg] =
    React.useState("");
  const [animeId, setAnimeId] = React.useState<number | undefined>(undefined);

  const animeMedia = collectionAnimes.find((a) => a?.id === animeId);

  React.useEffect(() => {
    if (router.isReady && collectionCtx && collectionId) {
      const collectionAnimeIds = collection
        ? Array.from(collection.animes)
        : [];
      if (collection && collectionAnimeIds.length > 0) {
        getAnimeList({ variables: { ids: collectionAnimeIds } });
      }
    }
  }, [collectionCtx, collectionId, getAnimeList, router, collection]);

  const collectionNameIsValid = (collectionName: string) => {
    if (!collectionCtx) return;
    const currCollection = collectionCtx.getCollection(collectionId);
    if (currCollection?.name === collectionName) {
      return true;
    }
    if (!collectionCtx.collectionNames[collectionName]) {
      return true;
    }
    return false;
  };

  const handleSubmitEditCollectionForm = ({
    collectionName,
  }: {
    collectionName: string;
  }) => {
    if (!collectionCtx) return;
    if (!collectionName) {
      setErrorSubmitCollectionMsg("This field is required");
      return;
    }
    if (!collectionNameIsValid(collectionName)) {
      setErrorSubmitCollectionMsg("Collection name already exists");
      return;
    }
    collectionCtx.updateCollectionName(collectionId, collectionName);
    setErrorSubmitCollectionMsg("");
    setShowEditCollectionModal(false);
  };

  const closeModal = () => {
    setAnimeId(undefined);
    setShowRemoveAnimeFromCollectionModal(false);
  };

  const renderAnimeCollections = () => {
    if (collectionAnimes.length <= 0 && loading) {
      return (
        <div>
          <p css={{ fontSize: "1.125rem" }}>Loading . . .</p>
        </div>
      );
    }
    if (collectionAnimes.length <= 0) {
      return <div>No animes added yet.</div>;
    }
    return (
      <div>
        <p css={{ fontWeight: 600, marginBottom: ".5rem" }}>
          Anime Collections:
        </p>
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
          {collectionAnimes.map((m, i) => (
            <Link
              css={{
                display: "block",
              }}
              key={m?.id}
              href={{
                pathname: "/anime/details",
                query: {
                  id: m?.id,
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
                <p css={{ fontSize: "1.25rem", textAlign: "center" }}>
                  {m?.title?.romaji}
                </p>
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
                      m?.coverImage?.extraLarge ||
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
                    onClick={(e) => {
                      e.preventDefault();
                      setShowRemoveAnimeFromCollectionModal(true);
                      setAnimeId(m?.id);
                    }}
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Container>
      <div
        css={{
          display: "grid",
          rowGap: "1rem",
        }}
      >
        <div
          css={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p css={{ fontWeight: 600 }}>
            Collection Name:{" "}
            <span css={{ fontWeight: 400 }}>{collection?.name}</span>
          </p>
          <button
            onClick={() => {
              setShowEditCollectionModal(true);
            }}
            css={{
              minWidth: "5rem",
              border: "none",
              backgroundColor: COLORS.blue,
              padding: ".5rem .875rem",
              color: COLORS.white,
              cursor: "pointer",
              borderRadius: ".75rem",
              fontWeight: 600,
              ":hover": {
                backgroundColor: COLORS.darkBlue,
              },
            }}
          >
            Edit Collection
          </button>
        </div>
        {renderAnimeCollections()}
        {showEditCollectionModal ? (
          <AddCollectionModal
            error={errorSubmitCollectionMsg}
            onClickClose={() => {
              setShowEditCollectionModal(false);
              setErrorSubmitCollectionMsg("");
            }}
            onSubmit={handleSubmitEditCollectionForm}
            initialValues={{
              collectionName: collection?.name || "",
            }}
          />
        ) : null}
        {showRemoveAnimeFromCollectionModal ? (
          <RemoveAnimeFromCollectionModal
            animeTitle={animeMedia?.title?.romaji || "-"}
            collectionName={collection?.name || "-"}
            onClickCancel={closeModal}
            onClickConfirm={() => {
              if (!collection || !animeId || !animeMedia || !collectionCtx)
                return;
              closeModal();
              collectionCtx.setCollectionList(
                collectionCtx.collections.map((c) => {
                  if (c.id !== collectionId) {
                    return c;
                  }
                  return {
                    ...c,
                    animes: new Set(
                      Array.from(collection.animes).filter(
                        (aid) => aid !== animeMedia?.id,
                      ),
                    ),
                  };
                }),
              );
            }}
          />
        ) : null}
      </div>
    </Container>
  );
};

export default CollectionDetails;
