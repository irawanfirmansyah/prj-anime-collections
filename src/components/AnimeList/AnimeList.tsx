import { COLORS } from "@/constants/colors";
import { useAnimeListPageContext, useCollectionContext } from "@/contexts";
import { GET_ANIME_LIST } from "@/lib/api";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import AnimeListPagination from "./AnimeListPagination";
import { AddAnimeToCollectionModal, Container } from "@/components";
import React from "react";
import { SubmitAnimeToCollectionEvents } from "@/types";

const AnimeList = () => {
  const animeListPageCtx = useAnimeListPageContext();
  const collectionCtx = useCollectionContext();

  const page = animeListPageCtx?.page || 1;
  const { loading, data, previousData } = useQuery(GET_ANIME_LIST, {
    variables: {
      page,
      perPage: 10,
      asHtml: false,
    },
  });

  const [showAddAnimeToCollectionModal, setShowAddAnimeToCollectionModal] =
    React.useState(false);
  const [errorSubmitCollectionMsg, setErrorSubmitCollectionMsg] =
    React.useState("");
  const [selectedAnimes, setSelectedAnimes] = React.useState<
    Map<number, { name: string }>
  >(new Map());

  const [selectMode, setSelectMode] = React.useState(false);

  const animeList = data?.Page?.media || previousData?.Page?.media || [];

  const closeModal = () => {
    setShowAddAnimeToCollectionModal(false);
    setErrorSubmitCollectionMsg("");
  };

  const onSubmitAddAnimeToCollectionForm = (
    event: SubmitAnimeToCollectionEvents,
  ) => {
    if (!collectionCtx) return;
    if (event.type === "NEW") {
      if (collectionCtx.collectionNames[event.collectionName]) {
        setErrorSubmitCollectionMsg("Collection name already exists");
        return;
      }
      collectionCtx.addCollection(
        event.collectionName,
        new Set(Array.from(selectedAnimes.keys())),
      );
      closeModal();
      setSelectMode(false);
    }
    if (event.type === "ADD_TO_EXISTING") {
      collectionCtx.setCollectionList(event.collections);
      closeModal();
      setSelectMode(false);
    }
  };

  const renderContent = () => {
    if (loading && animeList.length === 0) {
      return (
        <div>
          <p css={{ fontSize: "1.125rem" }}>Loading . . .</p>
        </div>
      );
    }
    return (
      <>
        <div
          css={{
            marginBottom: "2rem",
          }}
        >
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p css={{ fontSize: "1.5rem" }}>Anime List</p>
            <div>
              {selectMode ? (
                <button
                  css={{
                    backgroundColor: COLORS.black,
                    color: COLORS.white,
                    padding: ".5rem .875rem",
                    borderRadius: ".875rem",
                    fontSize: "1rem",
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                    marginRight: ".5rem",
                  }}
                  onClick={() => {
                    if (selectedAnimes.size > 0) {
                      setShowAddAnimeToCollectionModal(true);
                    }
                  }}
                >
                  Add to collection
                </button>
              ) : null}
              <button
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
                onClick={() => {
                  setSelectMode((s) => !s);
                  setSelectedAnimes(new Map());
                }}
              >
                {selectMode ? "Cancel" : "Select"}
              </button>
            </div>
          </div>
          {selectMode ? (
            <p css={{ fontSize: "1.5rem", textAlign: "center" }}>
              Select animes you would like to add
            </p>
          ) : null}
        </div>
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
          {animeList.map((m, i) => (
            <Link
              css={{
                display: "block",
                position: "relative",
              }}
              key={m?.id}
              href={{
                pathname: "/anime/details",
                query: {
                  id: m?.id,
                },
              }}
              onClick={(e) => {
                if (selectMode) {
                  e.preventDefault();
                  if (!m?.id) return;
                  let newSelectedAnimes = new Map(selectedAnimes);
                  if (selectedAnimes.has(m.id)) {
                    newSelectedAnimes.delete(m.id);
                  } else {
                    newSelectedAnimes.set(m.id, {
                      name: m.title?.romaji || "-",
                    });
                  }
                  setSelectedAnimes(newSelectedAnimes);
                }
              }}
            >
              {selectMode ? (
                <div css={{ position: "absolute", top: "1rem", left: "1rem" }}>
                  <input
                    type="checkbox"
                    css={{
                      padding: "100px",
                    }}
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    {...(m?.id && {
                      checked: selectedAnimes.has(m.id),
                    })}
                  />
                </div>
              ) : null}
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: ".5rem",
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
              </div>
            </Link>
          ))}
        </div>
        <AnimeListPagination />
      </>
    );
  };

  return (
    <Container>
      {renderContent()}
      {showAddAnimeToCollectionModal ? (
        <AddAnimeToCollectionModal
          onClickClose={closeModal}
          onSubmit={onSubmitAddAnimeToCollectionForm}
          collections={collectionCtx?.collections || []}
          error={errorSubmitCollectionMsg}
          selectedAnimes={selectedAnimes}
        />
      ) : null}
    </Container>
  );
};

export default AnimeList;
