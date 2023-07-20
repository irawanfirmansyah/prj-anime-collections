import { AddAnimeToCollectionModal, Container } from "@/components";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "@/lib/api";
import React from "react";
import { useCollectionContext } from "@/contexts";
import { SubmitAnimeToCollectionEvents } from "@/types";
import AnimeDetailsInfo from "../AnimeDetailsInfo/AnimeDetailsInfo";
import { COLORS } from "@/constants/colors";

const AnimeDetails = ({ animeId }: { animeId: number }) => {
  const { data, loading } = useQuery(GET_ANIME_BY_ID, {
    variables: { id: animeId },
    skip: !animeId,
  });

  const collectionCtx = useCollectionContext();

  const [showCollectionListModal, setShowCollectionListModal] =
    React.useState(false);
  const [errorSubmitCollectionMsg, setErrorSubmitCollectionMsg] =
    React.useState("");

  const onSubmitAddAnimeToCollectionForm = (
    event: SubmitAnimeToCollectionEvents,
  ) => {
    if (!collectionCtx) return;
    if (event.type === "NEW") {
      if (collectionCtx.collectionNames[event.collectionName]) {
        setErrorSubmitCollectionMsg("Collection name already exists");
        return;
      }
      collectionCtx.addCollection(event.collectionName, new Set([animeId]));
      closeModal();
    }
    if (event.type === "ADD_TO_EXISTING") {
      collectionCtx.setCollectionList(event.collections);
      closeModal();
    }
  };

  const closeModal = () => {
    setShowCollectionListModal(false);
    setErrorSubmitCollectionMsg("");
  };

  const renderContent = () => {
    if (!data || loading) {
      return (
        <div>
          <p css={{ fontSize: "1.125rem" }}>Loading . . .</p>
        </div>
      );
    }

    return (
      <AnimeDetailsInfo
        description={data.Media?.description || ""}
        episodes={data.Media?.episodes || 0}
        genres={data.Media?.genres || []}
        title={data.Media?.title?.romaji || ""}
        coverImageUrl={data.Media?.coverImage?.extraLarge || ""}
        collectedIn={
          collectionCtx?.collections
            .filter((c) => c.animes.has(animeId))
            .map((c) => ({ collectionName: c.name, id: c.id })) || []
        }
        ctaContent={
          <button
            onClick={() => setShowCollectionListModal(true)}
            css={{
              backgroundColor: COLORS.white,
              color: COLORS.black,
              padding: ".5rem .875rem",
              borderRadius: ".875rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              border: `1px solid ${COLORS.black}`,
              ":hover": {
                backgroundColor: COLORS.grey,
              },
            }}
          >
            Add to collection
          </button>
        }
      />
    );
  };

  return (
    <Container>
      {renderContent()}
      {showCollectionListModal ? (
        <AddAnimeToCollectionModal
          onClickClose={closeModal}
          onSubmit={onSubmitAddAnimeToCollectionForm}
          collections={collectionCtx?.collections || []}
          error={errorSubmitCollectionMsg}
        />
      ) : null}
    </Container>
  );
};

export default AnimeDetails;
